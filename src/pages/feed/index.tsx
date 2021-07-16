import { GetServerSideProps, NextPage } from 'next';
import { ChangeEvent, useState } from 'react';
import { Piu } from 'interfaces';
import { AxiosResponse } from 'axios';
import { parseCookies } from 'nookies';
import api from 'services/api';
import { useAuth } from 'hooks/auth';
import { getAPIClient } from 'services/axios';
import PiuCard from '../../components/PiuCard';
import Logo from '../../assets/Logo.svg';
import * as S from '../../styles/feedStyles';

interface PiusProps {
    pius: Piu[];
}
interface Texto {
    text: string;
}

const Feed: NextPage<PiusProps> = ({ pius }) => {
    const { logout } = useAuth();

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
            await api.post(
                '/pius',
                { text },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
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
                    {pius?.map((piu) => {
                        if (
                            search === '' ||
                            piu.user.first_name
                                .toLowerCase()
                                .includes(search.toLowerCase())
                        ) {
                            return (
                                <PiuCard
                                    id={piu.id}
                                    user={piu.user}
                                    likes={piu.likes}
                                    text={piu.text}
                                />
                            );
                        }
                        return <></>;
                    })}
                </div>
            </S.Feed>
        </>
    );
};

export default Feed;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const apiClient = getAPIClient(ctx);
    const { 'piupiuwerAuth.token': token } = parseCookies(ctx);

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
            Authorization: `Bearer: ${token}`
        }
    });

    return {
        props: {
            pius: response.data
        }
    };
};
