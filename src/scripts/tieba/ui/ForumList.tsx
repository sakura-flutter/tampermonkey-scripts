import { defineComponent, computed } from 'vue'
import { useGMvalue } from '@/composables/use-gm-value'
import Input from '@/components/input'
import Button from '@/components/button'
import type { PropType } from 'vue'
import type { LikeForumData } from '../types'

const ForumList = defineComponent({
  props: {
    dataSource: {
      type: Array as PropType<LikeForumData[]>,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
  },
  emits: ['clickSize'],
  setup(props, { emit }) {
    const keyword = useGMvalue('keyword', '')
    const isReverse = useGMvalue('is_reverse', false)

    const diaplayForums = computed(() => {
      let newList = [...props.dataSource]
      isReverse.value && newList.reverse()
      if (keyword.value) {
        // 忽略大小写
        newList = newList.filter(forum => new RegExp(keyword.value, 'i').test(forum.forum_name))
      }
      return newList
    })

    const counter = computed(() => ({
      total: props.dataSource.length,

      signed: props.dataSource.filter(({ is_sign }) => is_sign).length,
    }))

    function changeReverse() {
      isReverse.value = !isReverse.value
    }

    function expTitle(item: LikeForumData) {
      const MAX_EXP_DAILY = 8
      const needed = +item.levelup_score - +item.user_exp
      return `距离升级还需要${needed}经验，若每天+${MAX_EXP_DAILY}，还需要${Math.ceil(needed / MAX_EXP_DAILY)}天`
    }

    return () => (
      <>
        {props.dataSource.length > 0 && (
          <div class="forums-container">
            <header class="top-btns">
              <Button class="reverse-btn" size="mini" onClick={changeReverse}>
                {isReverse.value ? '已倒序' : '普通'}
                <span title="已签/总数">
                  {counter.value.signed}/{counter.value.total}
                </span>
              </Button>
              <Button class="resize-btn" size="mini" onClick={() => emit('clickSize')}>
                大小
              </Button>
            </header>
            <ul class={{ [props.size]: true }}>
              {diaplayForums.value.map(item => (
                <li key={item.forum_id}>
                  <a href={'/f?kw=' + encodeURIComponent(item.forum_name)} title={item.forum_name} target="_blank">
                    {item.forum_name}
                  </a>
                  <span class="signed">{item.is_sign ? ' √' : ''}</span>
                  <span class="level" title={item.level_name}>
                    {item.user_level}级
                  </span>
                  <span class="gain">{item.sign_bonus_point ? '+' + item.sign_bonus_point : ''}</span>
                  <span class="exp" title={expTitle(item)}>
                    {item.user_exp}/{item.levelup_score}
                  </span>
                </li>
              ))}
            </ul>
            {/* 太多时显示搜索 */}
            {props.dataSource.length > 25 && <Input v-model={keyword.value} placeholder="搜索" size="small" scale />}
          </div>
        )}
      </>
    )
  },
})

export default ForumList
