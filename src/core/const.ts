export const SEND_MESSAGE_PREFIX = (appid: string) => `message_for_ip_${appid}`;

export const APPLINK_PROTOCOL = 'tomoya:';
export const FORMAT_APPLINK = (appid: string) => `${APPLINK_PROTOCOL}${appid}`;
