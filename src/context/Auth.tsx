import React, { useContext } from 'react';
import handleLogin from '../utils/handleLogin';

interface ILoginProps {
  email: string;
  password: string;
}

interface IAuthContextData {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  id: number;
  setId: (id: number) => void;
  handleLogin(params: ILoginProps): Promise<void>;
}

// Cria um contexto de autenticação, para alterar o estado de autenticação em qualquer tela.
export const AuthContext = React.createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider: React.FC<ILoginProps> = ({children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [id, setId] = React.useState(0);
  
  async function onLogin({ email, password }: ILoginProps): Promise<void> {
    const idValue = await handleLogin({ email, password });

    if (idValue !== 0) {
      setIsAuthenticated(true);
      setId(idValue);
    }
  }
  
  return (
    <AuthContext.Provider
      value={{ 
        handleLogin: onLogin, 
        id,
        setId,
        isAuthenticated,
        setIsAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
}