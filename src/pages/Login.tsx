import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef, useContext, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../contexts/AuthContext';

import logo from '/images/medellin-black.png';
import erricon from '/icons/danger.svg';
import Input from '../components/auth/Input';

const Login = () => {
  const auth = useContext(AuthContext);

  const emailRef = useRef<HTMLInputElement>(null!);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, password]);

  const navigate = useNavigate();
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await auth.login(email, password);
      if (response) {
        navigate('/');
      };

    } catch (err: any) {
      setErrMsg(err.response.data.message);
    }
  };

  return (
    <section className='bg-neutral-100'>
      <div className='flex flex-col items-center justify-center mx-auto md:h-screen lg:py-0'>
        <div className='w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0'>
          <div className='px-8 py-10 space-y-8'>
            <div className='flex items-center space-x-4'>
              <div className='border-r border-neutral-300 h-20 pr-5'>
                <img className='w-24 py-3' src={logo} alt='logo' draggable='false' />
              </div>

              <div>
                <h2 className='flex flex-col'>
                  <span className='text-2xl font-semibold text-neutral-800'>
                    Bem vindo!
                  </span>
                  <span className='text-sm font-semibold text-neutral-600'>
                    Faça login para continuar
                  </span>
                </h2>
              </div>
            </div>

            {errMsg ?
              <motion.div className='flex justify-between items-center bg-red-300/30 p-3 rounded-lg border border-red-400 mb-3 font-semibold text-red-500'
                initial={{ maxHeight: '0%', opacity: 0, translateY: 50 }}
                animate={{ maxHeight: '100%', opacity: 1, translateY: 0 }}
                transition={{
                  duration: 1,
                  type: 'spring',
                }}
              >
                <p>
                  {errMsg}
                </p>

                <img src={erricon} />
              </motion.div> :

              ''

            }
            <form className='space-y-3' onSubmit={handleSubmit}>
              <div className='space-y-4'>
                <Input
                  id='email'
                  name='email'
                  label='E-mail'
                  type='text'
                  value={email}
                  innerRef={emailRef}
                  maxLength={50}
                  placeholder='johndoe@exemplo.com'
                  handleOnChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  required
                />
                <Input
                  id='password'
                  name='password'
                  label='Senha'
                  type='password'
                  value={password}
                  maxLength={50}
                  placeholder='••••••••••'
                  handleOnChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex px-1">
                <div className="flex items-center h-5">
                  <input id="remember" aria-describedby="remember" type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 accent-accent focus:ring-3 focus:ring-neutral-600 focus:outline-none"
                  />
                </div>
                <div className="ml-2 text-sm">
                  <label htmlFor="remember" className="text-neutral-600">
                    Lembrar de mim
                  </label>
                </div>
              </div>
              <div className='pt-8'>
                <button type='submit'
                  className='w-full text-white bg-accent font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-neutral-700 focus:ring-4 focus:outline-none focus:ring-neutral-400'>
                  Entrar
                </button>

              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login