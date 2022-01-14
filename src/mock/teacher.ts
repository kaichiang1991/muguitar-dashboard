import { eSubjectMap } from '../data/enums'

const teacherList: Array<ITeacherData> = [
  {
    key: '000',
    name: '迦安',
    subjects: [eSubjectMap.guitar],
  },
  {
    key: '001',
    name: '宏睿',
    subjects: [eSubjectMap.mixing, eSubjectMap.guitar, eSubjectMap.e_guitar],
  },
  {
    key: '002',
    name: '凱強',
    subjects: [eSubjectMap.e_guitar, eSubjectMap.guitar],
  },
]

export default teacherList
