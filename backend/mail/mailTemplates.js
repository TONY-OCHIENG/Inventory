
export const VERIFICATION_CODE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <title>Verify your email</title>
  <style>
    body { margin:0; padding:0; width:100% !important; background:#F0FDF4; -webkit-text-size-adjust:100%; }
    table { border-collapse:collapse; }
    img { border:0; display:block; outline:none; text-decoration:none; }
    a { color:#16A34A; }
    @media only screen and (max-width:620px) {
      .container { width:100% !important; }
      .px { padding-left:24px !important; padding-right:24px !important; }
      .code { font-size:28px !important; letter-spacing:6px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background:#F0FDF4;">

  <!-- Preheader (hidden preview text) -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#F0FDF4;">
    Confirm your email address to activate your IMS account.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F0FDF4;">
    <tr>
      <td align="center" style="padding:32px 12px;">

        <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0"
               style="width:600px;max-width:600px;background:#FFFFFF;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(22,163,74,0.12);">

          <!-- Header -->
          <tr>
            <td align="center" style="background:#16A34A;background-image:linear-gradient(135deg,#4ADE80 0%,#16A34A 100%);padding:40px 24px;">
              <!-- Host ims-logo.png on your server and replace the src with its full URL -->
              <img src="/home/tony-ochieng/Downloads/ims-box-green.svg" alt="IMS" width="72" height="72"
                   style="width:72px;height:72px;border-radius:18px;margin:0 auto; background-color: white;">
              <h1 style="margin:20px 0 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:24px;line-height:30px;font-weight:700;color:#FFFFFF;">
                Verify your email
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td class="px" style="padding:40px 48px 16px;font-family:'Segoe UI',Helvetica,Arial,sans-serif;color:#1F2937;">
              <p style="margin:0 0 24px;font-size:16px;line-height:26px;color:#4B5563;">
                Thanks for signing up for IMS. To finish setting up your account,  use the code below to verify your identity and continue signing in to IMS.
              </p>
            </td>
          </tr>

          <!-- Code (optional) -->
          <tr>
            <td class="px" style="padding:0 48px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                     style="background:#F0FDF4;border:1px dashed #86EFAC;border-radius:12px;">
                <tr>
                  <td align="center" style="padding:20px;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
                    
                    <p class="code" style="margin:0;font-family:'Courier New',Courier,monospace;font-size:32px;font-weight:700;letter-spacing:10px;color:#15803D;">
                      {verification_code}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Notes -->
          <tr>
            <td class="px" style="padding:0 48px 40px;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
              <p style="margin:0 0 12px;font-size:14px;line-height:22px;color:#6B7280;">
                This link and code expire in <strong>5 minutes</strong>. If you didn't create an IMS account, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="background:#F9FAFB;border-top:1px solid #E5E7EB;padding:24px 32px;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
              <p style="margin:0 0 6px;font-size:12px;line-height:18px;color:#9CA3AF;">
                &copy; 2026 IMS. All rights reserved.
              </p>
              <p style="margin:0;font-size:12px;line-height:18px;color:#9CA3AF;">
                tonyochiengdh@gmail.com &middot;
                <a href="" style="color:#16A34A;text-decoration:none;">Contact support</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>

`