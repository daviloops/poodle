'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import Box from "@mui/joy/Box";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Stack from "@mui/joy/Stack";
import FormHelperText from "@mui/joy/FormHelperText";

let store = require('store');

interface ILoginFormData {
  email: string
  name: string
}

type User = {
  name: string
  email: string
  favorites: Array<string>
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  
  const validationSchema = yup.object().shape({
    email: yup.string()
    .required('Email is required')
    .email('Email is invalid'),
    name: yup.string()
    .required('Name is required'),
  });
  
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ILoginFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: '',
      name: '',
    },
  });
  const { email, name } = watch();
  
  const login = async () => {
    setIsLoading(true);
    axios.post(`${apiUrl}/auth/login`, { email, name })
      .then(() => {
        const user: User = { name: name, email: email, favorites: [] };
        store.set('user', user);
        router.refresh();
        // router.replace('/').then(() => router.reload());

        router.push('/', {  });
      })
      .catch(e => console.error(e))
      .finally(() => setIsLoading(false));
  };

  const onSubmit = handleSubmit(async (e) => {
    // login();
    signIn("credentials", {
      email: email, name: name,
    });
  });

  return (
    <Box sx={{ minWidth: '300px' }}>
      <form onSubmit={onSubmit}>
        <Stack spacing={3}>
          <Stack spacing={1}>
            <FormControl error={!!errors.name}>
              <FormLabel>Name</FormLabel>
              <Controller
                name="name"
                control={control}
                rules={{ required: "Password is required" }}
                render={({ field }) => <Input {...field} type="text" placeholder="Enter your name..." />}
              />
              <FormHelperText>{errors.name?.message}</FormHelperText>
            </FormControl>
            <FormControl error={!!errors.email}>
              <FormLabel>Email</FormLabel>
              <Controller
                name="email"
                control={control}
                rules={{ required: "Email is required" }}
                render={({ field }) => <Input {...field} type="text" placeholder="Enter your email..." />}
              />
              <FormHelperText>{errors.email?.message}</FormHelperText>
            </FormControl>
          </Stack>
          <Button
            type="submit"
            sx={{
              color: (theme) => theme.palette.brown.main,
              backgroundColor: (theme) => theme.palette.pink.main,
              '&:hover': {
                backgroundColor: (theme) => theme.palette.pink.light,
              },
              '&:active': {
                backgroundColor: (theme) => theme.palette.pink.dark,
              }
            }}
          >
            Login
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default LoginForm;
