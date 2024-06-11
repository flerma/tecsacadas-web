import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputMask from 'react-input-mask';
import customerApi from '../../services/customer/customer-api';
import {
  TextField,
  Button,
  MenuItem,
  Grid,
  Typography
} from '@mui/material';
import './CustomerRegister.css';

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

const estados = [
  "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA",
  "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
  "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

const CustomerRegister = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await customerApi.post('/customer', data);
      console.log('Cadastro realizado com sucesso', response.data);
    } catch (error) {
      console.log('Erro no cadastro', error);
    }
  };

  return (
    <div className="container">
      <Typography variant="h4" gutterBottom>Cadastro de Cliente</Typography>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <Grid container spacing={2}>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={6} md={5} lg={7}>
              <TextField
                label="Nome"
                fullWidth
                {...register('nome')}
                error={!!errors.nome}
                helperText={errors.nome?.message}
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={3.5}>
              <Controller
                name="cpf"
                control={control}
                render={({ field }) => (
                  <InputMask {...field} mask="999.999.999-99" maskChar={null}>
                    {() => <TextField
                      label="CPF"
                      fullWidth
                      error={!!errors.cpf}
                      helperText={errors.cpf?.message}
                    />}
                  </InputMask>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3.5}>
              <Controller
                name="rg"
                control={control}
                render={({ field }) => (
                  <InputMask {...field} mask="99.999.999-9" maskChar={null}>
                    {() => <TextField
                      label="RG"
                      fullWidth
                      error={!!errors.rg}
                      helperText={errors.rg?.message}
                    />}
                  </InputMask>
                )}
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={2}>
              <Controller
                name="celular"
                control={control}
                render={({ field }) => (
                  <InputMask {...field} mask="(99) 99999-9999" maskChar={null}>
                    {() => <TextField
                      label="Celular"
                      fullWidth
                      error={!!errors.celular}
                      helperText={errors.celular?.message}
                    />}
                  </InputMask>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={5}>
              <TextField
                label="Email"
                fullWidth
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={1.2}>
              <Controller
                name="cep"
                control={control}
                render={({ field }) => (
                  <InputMask {...field} mask="99999-999" maskChar={null}>
                    {() => <TextField
                      label="CEP"
                      fullWidth
                      error={!!errors.cep}
                      helperText={errors.cep?.message}
                    />}
                  </InputMask>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4.8}>
              <TextField
                label="Endereço"
                fullWidth
                {...register('endereco')}
                error={!!errors.endereco}
                helperText={errors.endereco?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={1}>
              <TextField
                label="Número"
                fullWidth
                {...register('numero')}
                error={!!errors.numero}
                helperText={errors.numero?.message}
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={3.5}>
              <TextField
                label="Complemento"
                fullWidth
                {...register('complemento')}
                error={!!errors.complemento}
                helperText={errors.complemento?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3.5}>
              <TextField
                label="Bairro"
                fullWidth
                {...register('bairro')}
                error={!!errors.bairro}
                helperText={errors.bairro?.message}
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={3.5}>
              <TextField
                label="Cidade"
                fullWidth
                {...register('cidade')}
                error={!!errors.cidade}
                helperText={errors.cidade?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3.5}>
              <TextField
                select
                label="Estado"
                fullWidth
                {...register('estado')}
                error={!!errors.estado}
                helperText={errors.estado?.message}
              >
                {estados.map((estado) => (
                  <MenuItem key={estado} value={estado}>
                    {estado}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={3.5}>
              <Button type="submit" variant="contained" color="primary" className="button">
                Confirmar
              </Button>
            </Grid>
          </Grid>
        </Grid>
        
      </form>
    </div>
  );
};

export default CustomerRegister;
