import "server-only";

/** 운영 환경 여부. 내부 검토 화면을 운영에서 숨길 때 쓴다. */
export const isProduction = process.env.NODE_ENV === "production";
