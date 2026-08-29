export interface RecordType {
  /** 主键 */
  pid: string
  title: string
  customTitle?: string
  href: Location['href']
}

export type PasswordType = Record<RecordType['pid'], string>
