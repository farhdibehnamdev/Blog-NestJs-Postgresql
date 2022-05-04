enum responseMessages {
    SUCCESS = 'SUCCESS',
    FAILURE = 'FAILURE',
    ERROR = 'ERROR',
    NOT_FOUND = 'NOT_FOUND',
    BAD_REQUEST = 'BAD_REQUEST',
    UNAUTHORIZED = 'UNAUTHORIZED',
    FORBIDDEN = 'FORBIDDEN',
    CONFLICT = 'CONFLICT',
    SERVER_ERROR = 'SERVER_ERROR',
    NOT_IMPLEMENTED = 'NOT_IMPLEMENTED',
    BAD_GATEWAY = 'BAD_GATEWAY',
    SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
    GATEWAY_TIMEOUT = 'GATEWAY_TIMEOUT',
    UNSUPPORTED_MEDIA_TYPE = 'UNSUPPORTED_MEDIA_TYPE',
    UNPROCESSABLE_ENTITY = 'UNPROCESSABLE_ENTITY',
    TOO_MANY_REQUESTS = 'TOO_MANY_REQUESTS',
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
    INVALID_USER_ID = 'INVALID_USER_ID',
    INVALID_ROLE = 'INVALID_ROLE',
    FILE_IS_REQUIRED = 'FILE_IS_REQUIRED',
    FILE_SIZE_TOO_LARGE = 'FILE_SIZE_TOO_LARGE',
    INVALID_FILE_FORMAT = 'INVALID_FILE_FORMAT',
}

export function getResponseMessage(message: keyof typeof responseMessages) {
    return responseMessages[message];
}
