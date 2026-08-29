export interface WebApiLikeForumResponse {
  error: string
  no: number
  data: {
    /** 吧列表 */
    like_forum: {
      /** 吧名 */
      forum_name: string
      /** 用户等级 */
      user_level: string
      /** 经验值 */
      user_exp: string
      /** 吧 id */
      forum_id: number
      /** 是否关注 */
      is_like: boolean
      /** 0未签到 1已签到 */
      is_sign: 0 | 1
      /** 不知道什么来的 */
      favo_type: number
    }[]
    /** 调用接口需要传这个 tbs */
    tbs: string
    /** 也许是用户 id */
    uid: number
    /** 不知道什么来的 */
    itb_tbs: string
    /** 不知道什么来的 */
    ubs_sample_ids: string
    /** 不知道什么来的 */
    ubs_abtest_config: {
      sid: string
    }[]
  }
}

export interface WebApiSignResponse {
  errno: number
  errmsg: string
  sign_version: number
  is_block: number
  finfo: {
    forum_info: {
      forum_id: number
      forum_name: string
    }
    current_rank_info: {
      sign_count: number
    }
  }
  uinfo: {
    user_id: number
    is_sign_in: number
    user_sign_rank: number
    sign_time: number
    cont_sign_num: number
    total_sign_num: number
    cout_total_sing_num: number
    hun_sign_num: number
    total_resign_num: number
    is_org_name: number
  }
  /** 错误码 成功 0，签过 1101，签太快 1102，其它失败 */
  no: number
  /** 错误信息 错误的时候才会有 */
  error?: string
}

export interface AppApiLikeForumResponse {
  ctime: number
  error_code: string
  logid: number
  server_time: string
  time: number
  forum_list: {
    /** 吧 id */
    id: string
    /** 吧名 */
    name: string
    /** 等级 id */
    level_id: string
    /** 等级名称 */
    level_name: string
    /** 经验值 */
    cur_score: string
    /** 当前等级升满所需经验值 */
    levelup_score: string
    /** 吧头像，web 端为空 */
    avatar: ''
    /** 不知道什么来的 */
    favo_type: string
    /** 不知道什么来的，web 端为空 */
    slogan: ''
  }[]
}

export interface AppApiSignResponse {
  user_info: {
    user_id: string
    is_sign_in: string
    user_sign_rank: string
    sign_time: string
    cont_sign_num: string
    total_sign_num: string
    cout_total_sing_num: string
    hun_sign_num: string
    total_resign_num: string
    is_org_name: string
    sign_bonus_point: string
    miss_sign_num: string
    level_name: string
    levelup_score: string
    last_level_score: string
    last_score_left: string
    last_level_name: string
    last_level: string
    /** 吧所有等级信息 */
    all_level_info: {
      /** 等级 */
      id: string
      /** 等级名称 */
      name: string
      /** 该等级所需经验值 */
      score: string
    }[]
  }
  contri_info: any[]
  server_time: string
  time: number
  ctime: number
  logid: number
  /** 错误码 成功 0，签过 160002，签太快 340011，其它失败 */
  error_code: string
  /** 错误信息 错误的时候才会有 */
  error_msg?: string
}

export interface AppApiBatchSignResponse {
  /** 批量签到的结果，只返回签到成功 */
  info: {
    forum_id: string
    forum_name: string
    /** 0未签到 1已签到 */
    signed: '0' | '1'
    is_on: string
    is_filter: string
    /** 连续签到天数 */
    sign_day_count: string
    /** 获得经验 */
    cur_score: string
    error: {
      err_no: string
      usermsg: string
      errmsg: string
    }
  }[]
  show_dialog: string
  sign_notice: string
  is_timeout: string
  timeout_notice: string
  error: {
    errno: string
    errmsg: string
    usermsg: string
  }
  server_time: string
  time: number
  ctime: number
  logid: number
  error_code: string
}

export type LikeForumData = WebApiLikeForumResponse['data']['like_forum'][number] &
  Pick<AppApiLikeForumResponse['forum_list'][number], 'levelup_score' | 'level_name' | 'slogan'> & {
    /** 签到所获得的经验值 */
    sign_bonus_point?: string
  }

/** window.PageData */
export interface PageData {
  tbs: string
}
