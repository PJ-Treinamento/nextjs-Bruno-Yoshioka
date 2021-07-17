import { GetServerSideProps, NextPage } from 'next';
import { ChangeEvent, useState } from 'react';
import { Piu, User } from 'interfaces';
import { AxiosResponse } from 'axios';
import { parseCookies } from 'nookies';
import api from 'services/api';
import { useAuth } from 'hooks/auth';
import { getAPIClient } from 'services/axios';
import Timeline from 'components/Timeline';
import Logo from '../../assets/Logo.svg';
import * as S from '../../styles/feedStyles';

interface PiusProps {
    pius: Piu[];
    user: User;
}
interface Texto {
    text: string;
}

const Feed: NextPage<PiusProps> = ({ pius, user }) => {
    const { logout } = useAuth();

    const [timelinePius, setTimelinePius] = useState<Piu[]>(pius);
    const [textoPiu, setTextoPiu] = useState<string>('');
    const [search, setSearch] = useState('');
    const [overLimit, setOverLimit] = useState(false);
    const [reload, setReload] = useState(0);
    const { 'piupiuwerAuth.token': token } = parseCookies();

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const userInput = e.currentTarget?.value;
        setTextoPiu(userInput);
        userInput.length > 140 ? setOverLimit(true) : setOverLimit(false);
    };

    const postPiu = async ({ text }: Texto) => {
        if (textoPiu.length >= 0 && textoPiu.length <= 140) {
            const response = await api.post(
                '/pius',
                { text },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            const newPiu: Piu = {
                id: response.data.id,
                user,
                likes: [],
                text: textoPiu.trim(),
                created_at: response.data.created_at,
                updated_at: response.data.updated_at
            };
            setTimelinePius([newPiu, ...pius]);
            setTextoPiu('');
            setReload(reload + 1);
        }
    };

    return (
        <>
            <S.Header>
                <a href="/feed">
                    <S.Imagem src={Logo} alt="Logo" height={64} width={64} />
                </a>
                <h1>Piupiuwer</h1>
                <div>
                    <S.Search
                        placeholder="Pesquise no Piupiuwer"
                        type="text"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                    />
                    <S.Logout onClick={() => logout()}>Logout</S.Logout>
                </div>
            </S.Header>
            <S.Feed>
                <div>
                    <S.TxtArea
                        overLimit={overLimit}
                        value={textoPiu}
                        id="newPost"
                        name="piud"
                        placeholder="O que você está pensando?"
                        onChange={(e) => {
                            handleChange(e);
                        }}
                    />
                    <div>
                        <S.Contagem overLimit={overLimit}>
                            {textoPiu.length}/140
                        </S.Contagem>
                        <button
                            type="submit"
                            onClick={() => postPiu({ text: `${textoPiu}` })}
                        >
                            Piar
                        </button>
                    </div>
                </div>
                <div>
                    <Timeline pius={timelinePius} search={search} user={user} />
                </div>
            </S.Feed>
        </>
    );
};

export default Feed;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const apiClient = getAPIClient(ctx);
    const { 'piupiuwerAuth.token': token } = parseCookies(ctx);
    const { 'piupiuwerAuth.username': username } = parseCookies(ctx);

    if (!token) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        };
    }
    const response: AxiosResponse<Piu[]> = await apiClient.get('/pius', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const userResponse: AxiosResponse<User[]> = await api.get(
        `/users?username=${username}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return {
        props: {
            pius: response.data,
            user: userResponse.data[0]
        }
    };
};
