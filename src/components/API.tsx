const BASE_URL = "https://gateway.scan-interfax.ru/";
// Запрос для авторизации пользователя.
export const LOGIN_URL = BASE_URL + "api/v1/account/login";
// Запрос для получения информации об аккаунте пользователя.
export const LOGIN_INFO_URL =  BASE_URL + "api/v1/account/info";
// Запрос для получения сводки по количеству публикаций на конкретные даты.
export const HISTOGRAMS = BASE_URL + "api/v1/objectsearch/histograms";
// Поиск публикаций по запросу. Возвращает только список ID публикаций.
export const OBJECTSEARCH = BASE_URL + "api/v1/objectsearch";
// Запрос для получения текстов и параметров публикаций по их ID.
export const DOCUMENTS = BASE_URL + "api/v1/documents";