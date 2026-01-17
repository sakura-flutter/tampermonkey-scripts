/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard-scss'],
  rules: {
    'selector-class-pattern': null, // 名称限制
    'max-nesting-depth': null, // 嵌套的深度
    'selector-max-id': null, // ID 选择器数量
    'selector-id-pattern': null, // ID 选择器名称
    'selector-max-compound-selectors': null, // 选择器中复合选择器的数量
    'declaration-property-value-disallowed-list': null, // 在声明中指定不允许的属性和值的列表
    'selector-no-qualifying-type': null, // 禁止按类型限定选择器
  },
}
