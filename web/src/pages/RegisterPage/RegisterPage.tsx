import { RegisterForm } from '../../components/organisms/RegisterForm'
import { AuthLayout } from '../../components/templates/AuthLayout'

export function RegisterPage() {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  )
}
