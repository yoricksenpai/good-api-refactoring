import convict from 'convict';

// Define a schema
export const config = convict({
    env: {
        doc: 'The application environment.',
        format: ['production', 'development', 'staging', 'staging-bci'],
        default: 'development',
        env: 'NODE_ENV'
    },
    ip: {
        doc: 'The IP address to bind.',
        format: String,
        default: '127.0.0.1',
        env: 'IP_ADDRESS',
    },
    port: {
        doc: 'The port to bind.',
        format: 'port',
        default: 3000,
        env: 'PORT',
        arg: 'port'
    },
    host: {
        doc: 'Application host.',
        format: '*',
        default: 'localhost',
    },
    tokenSalt: {
        doc: 'Salt to encrypt tokens.',
        format: String,
        default: '',
        env: 'TOKEN_SALT',
        arg: 'token-salt'
    },
    tokenTTL: {
        doc: 'Token time to live.',
        format: Number,
        default: '',
        env: 'TOKEN_TTL',
        arg: 'token-ttl'
    },
    saltRounds: {
        doc: 'Nbr rounds for salt password encryption.',
        format: Number,
        default: 10,
        env: 'PASSWORDS_SALT_ROUNDS',
        arg: 'salt-rounds'
    },
    baseUrl: {
        doc: 'API base url.',
        format: String,
        default: '',
        env: 'BASE_URL',
        arg: 'base-url'
    },
    exportSalt: {
        doc: 'Export salt.',
        format: String,
        default: '',
        env: 'EXPORT_LINK_SALT',
        arg: 'export-salt'
    },
    exportTTL: {
        doc: 'Export time to live.',
        format: Number,
        default: 0,
        env: 'EXPORT_TTL',
        arg: 'export-ttl'
    },
    basePath: {
        doc: 'API base path.',
        format: String,
        default: ''
    },
    jwt: {
        tokenSalt: {
            doc: 'Salt for JWT tokens',
            format: String,
            default: '',
            env: 'JWT_TOKEN_SALT'
        },
        refreshTokenSalt: {
            doc: 'Salt for JWT refresh tokens',
            format: String,
            default: '',
            env: 'JWT_REFRESH_TOKEN_SALT'
        },
        tokenExpiration: {
            doc: 'JWT token expiration time',
            format: String,
            default: '1h',
            env: 'JWT_TOKEN_EXPIRATION'
        },
        refreshTokenExpiration: {
            doc: 'JWT refresh token expiration time',
            format: String,
            default: '7d',
            env: 'JWT_REFRESH_TOKEN_EXPIRATION'
        }
    },
    db: {
        host: {
            doc: 'Database host name/IP',
            format: '*',
            default: '127.0.0.1',
            env: 'DB_MONGO_HOST'
        },
        port: {
            doc: 'Database port number',
            format: 'port',
            default: 27017,
            env: 'DB_MONGO_PORT'
        },
        name: {
            doc: 'Database name',
            format: String,
            default: '',
            env: 'DB_MONGO_NAME'
        },
        auth: {
            user: {
                doc: 'Database user if any',
                format: String,
                default: '',
                env: 'DB_MONGO_USERNAME'
            },
            password: {
                doc: 'Database password if any',
                format: String,
                default: '',
                env: 'DB_MONGO_PASSWORD'
            }
        },
    },
    amqp: {
        host: {
            doc: 'amqp host name/IP',
            format: '*',
            default: 'amqp://localhost',
            env: 'AMQP_HOST'
        },
        secret: {
            doc: 'amqpHost secret',
            format: '*',
            default: '',
            env: 'AMQP_SECRET'
        },
    },
});

// Load environment dependent configuration
const env = config.get('env');
config.loadFile('./src/envs/' + env + '.json');

// Perform validation
config.validate({ allowed: 'strict' });

export default config;