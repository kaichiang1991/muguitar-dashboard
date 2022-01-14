import { eSubjectMap } from '../data/enums'

const students: Array<IStudentData> = [
  {
    key: '000',
    subjects: [eSubjectMap.mixing],
  },
  {
    key: '001',
    subjects: [eSubjectMap.guitar, eSubjectMap.e_guitar],
  },
  { key: '002', subjects: [eSubjectMap.guitar, eSubjectMap.mixing] },
]

export default students
