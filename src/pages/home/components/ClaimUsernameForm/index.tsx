import { Button, Text, TextInput } from '@ignite-ui/react'
import { Form, FormAnnotation } from './styles'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'

const ClaimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 letras'})
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário pode ter apenas letras e hifens'
    })
    .transform(username => username.toLowerCase()),
})

type ClaimUsernameFormData = z.infer<typeof ClaimUsernameFormSchema>

export function ClaimUsernameForm() {
  const {register, handleSubmit, formState: { errors, isSubmitting },} = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(ClaimUsernameFormSchema)
  })

  const router = useRouter()

  async function handleClaimUsername(data: ClaimUsernameFormData) {

    const { username } = data

    await router.push(`/register?username=${username}`)
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
        <TextInput
          size="sm"
          prefix="ignite.com/"
          {...register('username')}
          placeholder="seu-usuario"
        />
        <Button size="sm" type="submit"  disabled={isSubmitting}>
          Reservar
          <ArrowRight />
        </Button>


      </Form>
      <FormAnnotation>
        <Text size="sm">
          {errors.username ? errors.username.message : 'Digite o nome do usuário desejado'}
        </Text>
      </FormAnnotation>
    </>
  )
}
