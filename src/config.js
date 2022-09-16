import {config} from "dotenv";
config();

export default {
  URLMongo: process.env.URLMONGO,
  firebase: {
    type: "service_account",
    project_id: "coderhouse-backend-6eb18",
    private_key_id: "40800e875591c9e9e1d6fe7a917ad6c7287f707f",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDBoBo0Zrkz4Xqk\n6JUhYW1CruLEpu8/goBYepFfokFw366TZvuSnZMcXc16oO9ZKGR3UmchEHRhn5Q6\n4/pGSh+t5+DZn5WwWsGu3HZOjPJngu+OWNod3gn/0S2LT3Mxu8ythP72uoRjSqoe\n8RZt9v7RIeZfQ/eOerBHs1WcyobxxJW0gxviZX9br0mn+yRWFEnbWPr12nPOeMjg\npunOlNNl81op8P8BV3pa71bPYaUmzKuNCe5eheAarJPeOB0DNIVXBVVh5B31JQVg\nUzzE/qhTP4tJcHgN1ktFZeHaWpji2rTmOt/yLfrUSDIHSKn+DlIShKyof7FmI9ki\nLoZ5AUirAgMBAAECggEAKecjJKoCdKbcaunmtEWoZqEAdHyIFF+CtSM5aM/th6bw\n2feUhCNT3fSy7lH72niyXVxY8z/jX+kwJBqIZEPQXUtsTsyJkZPijJwrgk5ge2RL\nwaua8JHH6jPzvk1gaafx4K+CmhS9Z9uVu4KDTyL//HRwrbdA0PXeRnYaFgeCcrmu\n1zbpthmPAC22rSxU/GvBtZWuiEScTrQgkCQtOIPgHoYAR0rkfVlsTUqPcYDLG1C4\nZ5Gwqa6j+Q60+CUnrK1fsHHEGcyOrLRXOHHnY6TJV6M7nN86EILP0pdS0YUGH+IN\nqwSY5q6az1cn2bchkqfGX8qCL2el5KingkfODbkgSQKBgQDxv0ywHb2exTQf8BGz\nAuz7yjClh0GEx7T5Gpnw1zH69v+TFoTEIyXA7/KTBFs6ecnahRcNSfd5MG/l1mFj\n0wKJLCRgMenar1l6o8VUljFRgDUUlE6HAwCyQZ2VOU9hsbIkWqOHJQGNdvfT31hX\n7F/wom2h9VucCfiV9+X5zLNRzwKBgQDNCn9qZWuW11bQNiuAglcd0FVwIOiYU+I9\nHUWbL23O6fo0+cVdGqBgL1p3TAXGIdBx1M/gYz9wwfAKO0dEWuZwqf6/g+Wtb8vw\nvV1EC9rEuMk+zjTlHbwWXPtWMsM0EjMq/vXpP7C0hIlm0n3OviP5cV+oDy4GAx6b\nP8+lZEheZQKBgB97sWoSRXqi5hnusu9kRya3e0RjbAX12DzE2R2DeQ/dEQW/3gSJ\nK0aIOUgqPhNMfxxFTu49HsyaoUgGdmKAvYjNxeL9PR5szbNqFq3gbYXWs5L9iYiN\nvI56eyJO92aatL+FSly0VhJtVvMx2BiDQS9eh/aatJaKueQWB85TeVsDAoGAVGne\n/QmWGrq61euHS1fdz7tmgUw7FgNq3+g+MN584bO4O7kcxPDiV9cG8phMxD5Fl6ea\nkXGqu5xMW5n+BCk8N+P0qhn+I8Ij/w+m5w3OWjENQRsZ8b2lIrvTCbDKZpSbljbz\nPLzo3di2zKsZ+lSTcO15CTJ+qyD7p8TEkv3PQXUCgYEAu4ZVtAcBSmoj+m2jk3ar\nRn30MlcntnPUehBUXA9EgLSr/rKhZYYsbTl+CdRYli6Ry/yOy8tQknC45b1L/a5w\nP+dMkqCRflA8gsZii1Kfc4CsNQpt3l3WPxy/O8m2LQXtneUB4hrOF01NehZ2SRXh\nyjlEwJaI4xQo+J9SFbKZdOU=\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-sp6au@coderhouse-backend-6eb18.iam.gserviceaccount.com",
    client_id: "100212328197856908145",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-sp6au%40coderhouse-backend-6eb18.iam.gserviceaccount.com"
  },
  PORT: process.env.PORT || 8080,
  DATABASE: process.env.DATABASE || "mongoDB"
}