import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

export const revalidate = false;

// 默认 tokenizer 为 `multilingual`，对中文分词开箱可用。
export const { staticGET: GET } = createFromSource(source);
