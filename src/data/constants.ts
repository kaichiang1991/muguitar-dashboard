import { eSubjectMap } from './enums'

export const subjectMapTitle: { [key: number]: string } = {
  [eSubjectMap.guitar]: '木吉他',
  [eSubjectMap.e_guitar]: '電吉他',
  [eSubjectMap.mixing]: '編曲',
}

// 教師名字對應
export const teacherNameMap: { [key: string]: string } = {
  '000': '迦安',
  '001': '宏睿',
  '002': '凱強',
}

// 行事曆上教師顏色的對應
export const teacherColorMap: { [key: string]: string } = {
  '000': 'pink',
  '001': 'cyan',
  '002': '#108ee9',
}

// 學生名字對應
export const studentNameMap: { [key: string]: string } = {
  '000': '學生Ａ',
  '001': '學生Ｂ',
  '002': '學生Ｃ',
  '003': '學生Ｄ',
  '004': '學生Ｅ',
}
