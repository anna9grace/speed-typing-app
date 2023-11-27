import { randomNumber } from './utils/utils';

export const EMAIL_FORMAT = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;

export const MILLISECONDS_IN_MINUTE = 60000;

export enum ResultType {
  SPEED = 'speed-rate',
  PRECISION = 'precision-rate',
}

export const AppRoutes = {
  ROOT: '/',
  LOGIN: '/login',
  RESULT: '/result',
  STATS: '/stats',
};

export const BaseUrls = {
  TEXT: 'https://dummyjson.com/posts',
  AUTHORIZATION: 'https://7.react.pages.academy/wtw',
  RESULTS: 'http://localhost:3004/results',
};

const BACKEND_URL = 'https://13.design.pages.academy/guess-melody';

export const APIRoute = {
  LOGIN: '/login',
  LOGOUT: '/logout',
};

export enum AuthorizationStatus {
  AUTH = 'auth',
  NO_AUTH = 'noAuth',
  UNKNOWN = 'unknown',
}

export const MessageTexts = {
  START: 'Начните печатать, когда будете готовы!',
};

export const ResponseCode = {
  NOT_FOUND: 404,
};

export const Symbols = {
  LETTERS: [
    'a',
    'A',
    'b',
    'B',
    'c',
    'C',
    'd',
    'D',
    'e',
    'E',
    'f',
    'F',
    'g',
    'G',
    'h',
    'H',
    'i',
    'I',
    'j',
    'J',
    'k',
    'K',
    'l',
    'L',
    'm',
    'M',
    'n',
    'N',
    'o',
    'O',
    'p',
    'P',
    'q',
    'Q',
    'r',
    'R',
    's',
    'S',
    't',
    'T',
    'u',
    'U',
    'v',
    'V',
    'w',
    'W',
    'x',
    'X',
    'y',
    'Y',
    'z',
    'Z',
  ],
  OTHER_SYMBOLS: [
    '.',
    ',',
    ' ',
    '‘',
    "'",
    '’',
    '&',
    '`',
    '-',
    '!',
    '?',
    ':',
    ';',
    '"',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
  ],
};
