import "server-only";

/**
 * 중앙 코어 서버 API. 고객사 전용 서버(인스턴스)의 상태와 사용량을 가져옵니다.
 * 포털 "내 솔루션" 화면과 월 서버 운영비 청구 근거가 이 값입니다.
 */
export type InstanceStatus = "running" | "degraded" | "down" | "provisioning";

export type ClientInstance = {
  id: string;
  solution: "crm" | "connect" | "erp" | "ai-chatbot";
  url: string;
  status: InstanceStatus;
  version: string;
};

export type InstanceUsage = {
  instanceId: string;
  month: string; // YYYY-MM
  visits: number;
  storageGB: number;
  trafficGB: number;
};

const CORE_API_URL = process.env.CORE_API_URL;

/** TODO: 코어 서버 API 연결 */
export async function listInstances(_clientId: string): Promise<ClientInstance[]> {
  void CORE_API_URL;
  return [];
}

export async function getUsage(_instanceId: string, _month: string): Promise<InstanceUsage | null> {
  return null;
}
