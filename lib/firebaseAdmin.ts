// lib/firebaseAdmin.ts
import * as admin from "firebase-admin";

// Ensure Firebase Admin is initialized only once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: "mtc-e-learning",
      privateKey:
        "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC9jzwPNMyg40bg\nfcFyRJva4BtgUk70oHAFykaK1eTfGOt7soj7alEn7iq83npR+euOXK2OqK/wnO/7\nDJ2FyFsWCZLOWTeIn/KKedlQyIYSCGtql1+euLqEdhOaxRYavrViOPcaAII0lGKq\njh9R97hfDQ3VT8HxrTx7o1xHqTq/GBXblwHiYrTcD51clNqsdHHQ9PKSqaUBXgZo\nKe3Ie0TVZhatuQZUq/1oOzXzXmE10wegAaDSMs6vTcQMYt+qhkSXAVZnprEwmsvf\nD9uljA7d9FdRnfeEu/r840dUcDpkr7VSE9JWEYlPRDP6en524/VDT+Oa1az7wdjY\n4Q6zBPZvAgMBAAECggEAPNWhkD3BKCcYgYZKVWo4XIuMraJsrWxp1ynd7sOLYp/k\nPvwCozExH2/7bka2GeXrl3IdzwlLAZzUFY0sZplwxgdHgoq2XFX8qD1HpXndMR9b\nncc7zDv7u/QLAaIboHSw0Hd4sfMU1lwCuDrJSWyHUpXlaR5iHzYaEZHRVTw12sqK\nFlw1XBNbjfyjoc6hkHYHE6Jtx1SEn5pmlgRGYwjq+qVd+ZwBUIyHMiQrAsE5Cqn9\nQhSTtnyO8Es6QVHLe1UE8lfZdi+qcXUllXMWje718tx8m4whV5wzCqFdfjUMxwwy\nxWhrIFbl1OEGUeNEfRavrt8wInTF4eeCmnHpP+o8bQKBgQDhecNYsrRoK78+hnZV\n4TMJwEq90gQ0Uc0Bnpp0vU+ek8D+AEMA28Yl1OlBZxXyXDGXrzSIfbTAxmgnBi8I\nEuws+mNH1ZD0rqRQCZpOYWH+g5wS1KugxAFRjPjeBORzQM2taPWzmdzy+LHr7vPo\nIeIY+DHMIRFEpxB6GtpZGuAXHQKBgQDXOLzilAJQDlsS70l2Or8gfOBzNUiQpzRK\n+FNYmjnla51V45g5f9AvjlyiT61xG/1xkh626FBLxJAEBrHhxCHBAZPadqLlNtaf\nu59vM7nwrzl5Qf8aKNUp7E4MAhXN8WOhcT/BhxgcEImc4Fb2C6WMKSXn441Tpiiw\nRkmbv/zx+wKBgQC7Zn6MDAuRwTp0d0GHY2MOKbp1RkakTZC8Vdw+RtIUFO4ErqcB\n4agw7WLpLwq4oxO85Kwe/Yvr5XvPY35XkZKmV32IyOJv229J7pFHr/zIkw53QDdd\nqUsHQsndjedqO2Q3StNb8PgJIdaPJ82lE/RdmHubE6jMjKZPNl5gTMwPqQKBgQCk\nscdhP9ARQRsSf0hhEA2IJ+d+Ygz4nOsYX7Uv/T1GwbYxrqujfJpsee2LS5u3DatB\niIa2g0pG4NEwM4tV78fAsZtaNyTqcK+GpoYYC6ZDd2Ns1kMH2q1cmncTG1liMlGC\njm4yg1XAzCrygH4rZLg3bJmUPP6+P02truvPIvjGlwKBgGYqyArusQkJ60H0Ocoz\nm484yS2Ah975ipHIsr5MjUeLYc/zB2E6Cm/Q1ZbqilEyH1wwfxzLlwYBkYI5MeM8\nxaajo/zdl9zpkk4EK21IpKBPetxG/ecJ7UeShSpfB0xuAnI9zjOlQBf7hF+NiPa6\nTlXJIzU6ij4gsZsicYm/G6cx\n-----END PRIVATE KEY-----\n",
      clientEmail:
        "firebase-adminsdk-fbsvc@mtc-e-learning.iam.gserviceaccount.com",
    }),
  });
}

export { admin };
