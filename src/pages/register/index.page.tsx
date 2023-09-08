import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { Container, Form, FormError, Header } from "./styles";
import { ArrowRight } from 'phosphor-react';
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const RegisterFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 letras'})
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário pode ter apenas letras e hifens'
    })
    .transform(username => username.toLowerCase()),
  name: z.string().min(3, { message: 'O nome precisa ter pelo menos 3 letras'})
})

type RegisterFormData = z.infer<typeof RegisterFormSchema>

export default function Register(){
  const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterFormSchema)
  })

  async function handleRegister(data: RegisterFormData) {

  }

  return(
    <Container>
      <Header>
        <Heading
          as="strong"
        >
          Bem vindo ao Call With Me!
        </Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={1}/>
      </Header>

      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <label htmlFor="">
          <Text size="sm">Nome de usuário</Text>
          <TextInput prefix="ignite.com/" placeholder="seu-usuario" {...register('username')}/>

          {errors.username && (
            <FormError size="sm">{errors.username.message}</FormError>
          )}
        </label>

        <label htmlFor="">
          <Text size="sm">Nome completo</Text>
          <TextInput prefix="ignite.com/" placeholder="Seu nome" {...register('name')}/>

          {errors.name && (
            <FormError size="sm">{errors.name.message}</FormError>
          )}
        </label>

        <Button>
          Próximo passo
          <ArrowRight />
        </Button>
      </Form>
    </Container>
  )
}
