import axios from 'axios';

// Axios 인스턴스 생성
const api = axios.create({
    baseURL: 'http://localhost:5678/api', // 백엔드 API의 기본 URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Board 엔터티에 대한 CRUD 메서드
export const getBoards = async () => {
    const response = await api.get('/boards');
    return response.data;
};

export const getBoardById = async (id: string) => {
    const response = await api.get(`/boards/${id}`);
    return response.data;
};

export const createBoard = async (board: { name: string; description: string }) => {
    const response = await api.post('/boards', board);
    return response.data;
};

export const updateBoard = async (id: string, board: { name: string; description: string }) => {
    const response = await api.put(`/boards/${id}`, board);
    return response.data;
};

export const deleteBoard = async (id: string) => {
    await api.delete(`/boards/${id}`);
};

// Game 엔터티에 대한 CRUD 메서드
export const getGames = async () => {
    const response = await api.get('/games');
    return response.data;
};

export const getGameById = async (id: string) => {
    const response = await api.get(`/games/${id}`);
    return response.data;
};

export const createGame = async (game: { name: string; description: string; history: string; rules: string; imageURL: string; unityContentId: string }) => {
    const response = await api.post('/games', game);
    return response.data;
};

export const uploadGameImage = async (gameId: string, formData: FormData) => {
    const response = await api.post(`/games/${gameId}/uploadImage`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const updateGame = async (id: string, game: { name: string; description: string; history: string; rules: string; imageURL: string }) => {
    const response = await api.put(`/games/${id}`, game);
    return response.data;
};

export const deleteGame = async (id: string) => {
    await api.delete(`/games/${id}`);
};

// Post 엔터티에 대한 CRUD 메서드
export const getPosts = async () => {
    const response = await api.get('/posts');
    return response.data;
};

export const getPostById = async (id: string) => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
};

export const getPostsByBoardId = async (boardId: string) => {
    const response = await api.get(`/posts/board/${boardId}`);
    return response.data;
};

export const createPost = async (post: { board: { id: string }; title: string; content: string; createDate: string }) => {
    const response = await api.post('/posts', post);
    return response.data;
};

export const updatePost = async (id: string, post: { boardId: string; title: string; content: string; createDate: string }) => {
    const response = await api.put(`/posts/${id}`, post);
    return response.data;
};

export const deletePost = async (id: string) => {
    await api.delete(`/posts/${id}`);
};

// UnityContent 엔터티에 대한 CRUD 메서드
export const getUnityContents = async () => {
    const response = await api.get('/unityContents');
    return response.data;
};

export const getUnityContentById = async (id: string) => {
    const response = await api.get(`/unityContents/${id}`);
    return response.data;
};

export const createUnityContent = async (unityContent: { name: string; description: string; url: string }) => {
    const response = await api.post('/unityContents', unityContent);
    return response.data;
};

export const updateUnityContent = async (id: string, unityContent: { name: string; description: string; url: string }) => {
    const response = await api.put(`/unityContents/${id}`, unityContent);
    return response.data;
};

export const deleteUnityContent = async (id: string) => {
    await api.delete(`/unityContents/${id}`);
};

// Location 엔터티에 대한 CRUD 메서드
export const getLocations = async () => {
    const response = await api.get('/locations');
    return response.data;
};

export const getLocationById = async (id: string) => {
    const response = await api.get(`/locations/${id}`);
    return response.data;
};

export const createLocation = async (location: { name: string; description: string }) => {
    const response = await api.post('/locations', {
        name: location.name,
        description: location.description
    });
    return response.data;
};

export const uploadLocationImage = async (locationId: string, formData: FormData) => {
    const response = await api.post(`/locations/${locationId}/uploadImage`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const updateLocation = async (id: string, location: { name: string; description: string; imageURL: string }) => {
    const response = await api.put(`/locations/${id}`, location);
    return response.data;
};

export const deleteLocation = async (id: string) => {
    await api.delete(`/locations/${id}`);
};

export default api;
