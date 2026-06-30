import source from '../all-in/legacy-source.js';
import { buildStructuredEra } from '../../shared/legacy-structured-builder.js';
import { config } from './config.js';
export default buildStructuredEra(source, config);
