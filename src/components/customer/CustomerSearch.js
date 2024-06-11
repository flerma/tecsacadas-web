import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputMask from 'react-input-mask';
import customerApi from '../../services/customer/customer-api.js';

const schema = yup.object().shape({
  nome: yup.string().required('Nome é obrigatório').max(50, 'Máximo 50 caracteres'),
  cpf: yup.string().required('CPF é obrigatório').matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'Formato inválido'),
  rg: yup.string().required('RG é obrigatório').matches(/^\d{2}\.\d{3}\.\d{3}-\d{1}$/, 'Formato inválido'),
  email: yup.string().email('Email inválido').required('Email é obrigatório').max(50, 'Máximo 50 caracteres'),
  celular: yup.string().required('Celular é obrigatório').matches(/^\(\d{2}\) \d{5}-\d{4}$/, 'Formato inválido'),
  endereco: yup.string().required('Endereço é obrigatório').max(50, 'Máximo 50 caracteres').matches(/^[A-Za-z\s]+$/, 'Apenas letras são permitidas'),
  complemento: yup.string().matches(/^[A-Za-z0-9\s]*$/, 'Apenas letras e números são permitidos').max(30, 'Máximo 30 caracteres'),
  numero: yup.string().required('Número é obrigatório').matches(/^\d{1,6}$/, 'Apenas números são permitidos e no máximo 6 dígitos'),
  bairro: yup.string().required('Bairro é obrigatório').max(50, 'Máximo 50 caracteres').matches(/^[A-Za-z\s]+$/, 'Apenas letras são permitidas'),
  cidade: yup.string().required('Cidade é obrigatória').max(50, 'Máximo 50 caracteres'),
  estado: yup.string().required('Estado é obrigatório').max(2, 'Máximo 2 caracteres'),
  cep: yup.string().required('CEP é obrigatório').matches(/^\d{5}-\d{3}$/, 'Formato inválido'),
});

const CustomerSearch = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await customerApi.post('/customer', data);
      console.log('Cadastro realizado com sucesso', response.data);
      // redirecionar ou mostrar uma mensagem de sucesso
    } catch (error) {
      console.log('Erro no cadastro', error);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        <h2>Cadastro de Usuário</h2>

        {fields.map(({ name, placeholder, mask, maxLength, pattern }) => (
          <div key={name}>
            {mask ? (
              <Controller
                name={name}
                control={control}
                render={({ field }) => (
                  <InputMask {...field} mask={mask} placeholder={placeholder} style={errors[name] ? { ...styles.input, ...styles.error } : styles.input} />
                )}
              />
            ) : (
              <input
                type="text"
                placeholder={placeholder}
                maxLength={maxLength}
                {...register(name)}
                style={errors[name] ? { ...styles.input, ...styles.error } : styles.input}
              />
            )}
            {errors[name] && <p style={styles.errorMessage}>{errors[name]?.message}</p>}
          </div>
        ))}

        <button type="submit" style={styles.button}>Confirmar</button>
      </form>
    </div>
  );
};

const fields = [
  { name: 'nome', placeholder: 'Nome' },
  { name: 'cpf', placeholder: 'CPF', mask: '999.999.999-99' },
  { name: 'rg', placeholder: 'RG', mask: '99.999.999-9' },
  { name: 'email', placeholder: 'Email' },
  { name: 'celular', placeholder: 'Celular', mask: '(99) 99999-9999' },
  { name: 'endereco', placeholder: 'Endereço' },
  { name: 'complemento', placeholder: 'Complemento', maxLength: 30 },
  { name: 'numero', placeholder: 'Número', maxLength: 6 },
  { name: 'bairro', placeholder: 'Bairro' },
  { name: 'cidade', placeholder: 'Cidade' },
  { name: 'estado', placeholder: 'Estado', maxLength: 2 },
  { name: 'cep', placeholder: 'CEP', mask: '99999-999' },
];

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  button: {
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
  error: {
    border: '1px solid red',
  },
  errorMessage: {
    color: 'red',
    marginTop: '10px',
  },
};

export default CustomerSearch;