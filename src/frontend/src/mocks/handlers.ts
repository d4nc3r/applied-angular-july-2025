import { identity_handlers } from './identity_handler';
import { links_handlers } from './links-handler';

export const handlers = [...links_handlers, ...identity_handlers];
