import { Plus } from 'lucide-react'
import { ResumeCardButtonComponent } from './resume-card'

const AddResumeButtonComponent = () => {
  return (
    <ResumeCardButtonComponent 
    title='Criar Novo Currículo'
    description='Crie um novo currículo'
    icon={<Plus size={50}/>}
    />
  )
}

export default AddResumeButtonComponent