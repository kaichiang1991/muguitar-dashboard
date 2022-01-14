import { eSubjectMap } from '../data/enums'

const teacherList: Array<ITeacherData> = [
  {
    key: '000',
    subjects: [eSubjectMap.guitar],
  },
  {
    key: '001',
    subjects: [eSubjectMap.mixing, eSubjectMap.guitar, eSubjectMap.e_guitar],
  },
  {
    key: '002',
    subjects: [eSubjectMap.e_guitar, eSubjectMap.guitar],
  },
]

export default teacherList
