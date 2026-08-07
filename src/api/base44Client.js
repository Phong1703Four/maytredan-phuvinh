import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

const { appId, token, functionsVersion, appBaseUrl } = appParams;

const clientOptions = {
  appId,
  functionsVersion,
  serverUrl: '',
  requiresAuth: false,
  appBaseUrl
};
if (token) {
  clientOptions.token = token;
}

//Create a client with authentication required
export const base44 = createClient(clientOptions);
