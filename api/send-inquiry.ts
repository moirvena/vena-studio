import nodemailer from 'nodemailer';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const {
    brandName,
    contactPerson,
    email,
    phone,
    selectedPackage,
    selectedAddons,
    targetMarkets,
    category,
    instagramHandle,
    websiteUrl,
    monthlyBudget,
    message,
    inquiryId,
  } = req.body || {};

  if (!brandName || !contactPerson || !email) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailAppPassword) {
    console.error('GMAIL_USER or GMAIL_APP_PASSWORD env vars are not set');
    res.status(500).json({ error: 'Email is not configured' });
    return;
  }

  const subject = `[VENASTUDIO 문의] ${brandName} - ${selectedPackage || ''}`;
  const body = [
    'VENASTUDIO 프로젝트 문의',
    '',
    `브랜드명 / 기업명: ${brandName}`,
    `담당자: ${contactPerson}`,
    `회신 이메일: ${email}`,
    `연락처: ${phone || '-'}`,
    `관심 패키지: ${selectedPackage || '-'}`,
    `추가 옵션: ${Array.isArray(selectedAddons) && selectedAddons.length ? selectedAddons.join(', ') : '-'}`,
    `타깃 국가: ${Array.isArray(targetMarkets) && targetMarkets.length ? targetMarkets.join(', ') : '-'}`,
    `제품 / 산업 카테고리: ${category || '-'}`,
    `Instagram: ${instagramHandle || '-'}`,
    `웹사이트: ${websiteUrl || '-'}`,
    `월 예산: ${monthlyBudget || '-'}`,
    '',
    '문의 내용:',
    message || '-',
    '',
    `접수 번호: ${inquiryId || '-'}`,
  ].join('\n');

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    await transporter.sendMail({
      from: `"VENASTUDIO 문의 알림" <${gmailUser}>`,
      to: gmailUser,
      replyTo: email,
      subject,
      text: body,
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Failed to send inquiry email:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
}
