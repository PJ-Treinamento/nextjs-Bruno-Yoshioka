import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
import { useAuth } from 'hooks/auth';
import { parseCookies } from 'nookies';
import Logo from '../assets/Logo.svg';
import * as S from '../styles/landingStyles';

const Login: NextPage = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <S.Container>
            <S.Esquerda>
                <S.Imagem src={Logo} alt="Logo" />
                <S.Nome>Piupiuwer</S.Nome>
                <S.Slogan>Seja bem vindo</S.Slogan>
                <S.By>By Poli Júnior© 2021</S.By>
            </S.Esquerda>
            <S.Direita>
                <S.Log>Entre no Piupiuwer</S.Log>
                <S.Input
                    type="text"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <S.Input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <S.LogIn
                    onClick={() =>
                        login({ email: `${email}`, password: `${password}` })
                    }
                >
                    Entrar
                </S.LogIn>
            </S.Direita>
        </S.Container>
    );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { 'piupiuwerAuth.token': token } = parseCookies(ctx);

    if (token) {
        return {
            redirect: {
                destination: '/feed',
                permanent: false
            }
        };
    }

    return { props: {} };
};
