/* eslint-disable no-lone-blocks */
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };

  onRegister?: (
    firstName: string,
    lastName: string,
    email: string,
    userName: string,
    password: string,
    confirmPassword: string,
  ) => Promise<any>;

  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
  onConfirmEmail?: (userId: string, code: string) => Promise<any>;
  onResetPassword?: (email: string, password: string, confirmPassword: string) => Promise<any>;
}

export const TOKEN_KEY = 'jwt-token';

export const API_URL = 'https://healthcareintourism-test.azurewebsites.net/swagger/index.html?classId=79a6f82e-4333-493c-bca6-c5ce652c6c6e&assignmentId=a9047589-f065-44c4-9724-4028e0660f6e&submissionId=9ea2c427-c762-2884-4009-207a0cdb3828/api';
export const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};
export const AuthProvider = ({ children }: any) => {
  const [cookies, setCookie, removeCookie] = useCookies([TOKEN_KEY]);
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await cookies[TOKEN_KEY];
      if (token) {
        axios.defaults.headers.common[`Authorization`] = `Bearer ${token}`;
        setAuthState({
          token: token,
          authenticated: true,
        });
      }
    };
    loadToken();
  }, [cookies]);

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    userName: string,
    password: string,
    confirmPassword: string
  ) => {
    try {
      const result = await axios.post(`${API_URL}/Account/register`, {
        firstName,
        lastName,
        email,
        userName,
        password,
        confirmPassword,
      });
      return result;
    } catch (e) {
      return { error: true, msg: (e as any).response.data };
    }
  };

  const confirmEmail = async (userId: string, code: string) => {
    try {
      const result = await axios.post(`${API_URL}/Account/confirm-email`, {
        userId,
        code,
      });
    {/* 
      setAuthState({
        token: result.data.jwToken,
        authenticated: true,
      });

      axios.defaults.headers.common[`Authorization`] = `Bearer ${result.data.jwToken}`;
      await SecureStore.setItemAsync(TOKEN_KEY, result.data.jwToken);
*/}

      return result;
    } catch (e) {
      console.log((e as any).response);
      return { error: true, msg: (e as any).response.data.message };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await axios.post(`${API_URL}/Account/authenticate`, {
        email,
        password,
      });

      setAuthState({
        token: result.data.jwToken,
        authenticated: true,
      });
      axios.defaults.headers.common[`Authorization`] = `Bearer ${result.data.jwToken}`;

      setCookie(TOKEN_KEY, result.data.jwToken);
      return result;
    } catch (e) {
      return { error: true, msg: (e as any).response.data };
    }
  };

  const logout = async () => {
    removeCookie(TOKEN_KEY);

    axios.defaults.headers.common[`Authorization`] = '';

    setAuthState({
      token: null,
      authenticated: false,
    });
  };
  const resetPassword = async (email: string, password: string, confirmPassword: string): Promise<any> => {
    try {
      return await axios.post(`${API_URL}/Account/reset-password`, {
        email,
        token: cookies[TOKEN_KEY],
        password,
        confirmPassword,
      });
    } catch (e) {
      return {
        error: true,
        msg: (e as any).response?.data?.msg || 'An error occurred while reseting the password.',
      };
    }
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    onConfirmEmail: confirmEmail,
    onResetPassword: resetPassword,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
