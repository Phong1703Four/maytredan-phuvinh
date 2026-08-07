import { useLang } from '../context/LanguageContext';
import { Shield, Lock, Eye, Cookie, Mail, ArrowLeft, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const CONTENT = {
    vi: {
        intro: 'Phú Vinh AI cam kết bảo vệ quyền riêng tư của bạn. Chính sách này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân khi bạn sử dụng website và dịch vụ của chúng tôi.',
        sections: [
            {
                icon: Eye, title: '1. Thông Tin Chúng Tôi Thu Thập',
                body: 'Khi bạn đặt hàng hoặc tạo tài khoản, chúng tôi thu thập: họ tên, số điện thoại, email, địa chỉ giao hàng và thông tin đơn hàng. Chúng tôi cũng tự động thu thập dữ liệu duyệt web (cookie, địa chỉ IP) để cải thiện trải nghiệm.',
            },
            {
                icon: Lock, title: '2. Cách Chúng Tôi Sử Dụng Thông Tin',
                body: 'Thông tin của bạn được dùng để: xử lý đơn hàng, giao hàng, gửi email xác nhận, thông báo ưu đãi và cải thiện sản phẩm. Chúng tôi KHÔNG bán thông tin cá nhân của bạn cho bên thứ ba.',
            },
            {
                icon: Cookie, title: '3. Cookie & Công Nghệ Theo Dõi',
                body: 'Chúng tôi sử dụng cookie để ghi nhớ đăng nhập, phân tích lưu lượng truy cập và cá nhân hóa nội dung. Bạn có thể tắt cookie trong cài đặt trình duyệt, nhưng một số tính năng có thể không hoạt động.',
            },
            {
                icon: Shield, title: '4. Bảo Mật Dữ Liệu',
                body: 'Chúng tôi áp dụng các biện pháp bảo mật tiêu chuẩn ngành: mã hóa TLS, kiểm soát truy cập nội bộ và sao lưu định kỳ. Tuy nhiên, không có phương thức truyền tải nào qua Internet là 100% an toàn.',
            },
            {
                icon: Eye, title: '5. Quyền Của Bạn',
                body: 'Bạn có quyền: xem, chỉnh sửa hoặc xóa thông tin cá nhân của mình; hủy đăng ký nhận email; và yêu cầu xuất dữ liệu. Liên hệ với chúng tôi để thực hiện các quyền này.',
            },
            {
                icon: Mail, title: '6. Liên Hệ',
                body: 'Nếu bạn có câu hỏi về chính sách bảo mật, vui lòng liên hệ: contact@phuvinhmaytredan.vn hoặc số điện thoại 0912 345 678. Địa chỉ: Phú Vinh, Chương Mỹ, Hà Nội.',
            },
        ],
        rights: [
            'Quyền được biết thông tin của bạn được sử dụng như thế nào',
            'Quyền yêu cầu xóa dữ liệu cá nhân',
            'Quyền từ chối tiếp thị qua email',
            'Quyền truy cập và sao chép dữ liệu của bạn',
        ],
    },
    en: {
        intro: 'Phú Vinh AI is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information when you use our website and services.',
        sections: [
            {
                icon: Eye, title: '1. Information We Collect',
                body: 'When you place an order or create an account, we collect: name, phone number, email, shipping address, and order details. We also automatically collect browsing data (cookies, IP address) to improve your experience.',
            },
            {
                icon: Lock, title: '2. How We Use Your Information',
                body: 'Your information is used to: process orders, deliver shipments, send confirmation emails, notify promotions, and improve products. We do NOT sell your personal information to third parties.',
            },
            {
                icon: Cookie, title: '3. Cookies & Tracking Technologies',
                body: 'We use cookies to remember logins, analyze traffic, and personalize content. You can disable cookies in your browser settings, but some features may not work properly.',
            },
            {
                icon: Shield, title: '4. Data Security',
                body: 'We apply industry-standard security measures: TLS encryption, internal access controls, and regular backups. However, no method of transmission over the Internet is 100% secure.',
            },
            {
                icon: Eye, title: '5. Your Rights',
                body: 'You have the right to: view, edit, or delete your personal information; unsubscribe from emails; and request data export. Contact us to exercise these rights.',
            },
            {
                icon: Mail, title: '6. Contact Us',
                body: 'If you have questions about our privacy policy, please contact: contact@phuvinhmaytredan.vn or phone 0912 345 678. Address: Phú Vinh, Chương Mỹ, Hà Nội.',
            },
        ],
        rights: [
            'Right to know how your information is used',
            'Right to request deletion of personal data',
            'Right to opt out of email marketing',
            'Right to access and copy your data',
        ],
    },
};

export default function PrivacyPolicy() {
    const { lang, t } = useLang();
    const c = CONTENT[lang] || CONTENT.vi;

    return (
        <div className="min-h-screen bg-background text-foreground pt-20 pb-16">
            <div className="container mx-auto px-4 max-w-3xl">
                <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4" /> {t('privacy.back')}
                </Link>

                <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">{t('privacy.title')}</h1>
                        <p className="text-xs text-muted-foreground">{t('privacy.updated')}</p>
                    </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-10">{c.intro}</p>

                <div className="space-y-6 mb-10">
                    {c.sections.map((s, i) => (
                        <div key={i} className="p-5 rounded-2xl bg-card border border-border">
                            <div className="flex items-center gap-2 mb-2">
                                <s.icon className="w-5 h-5 text-primary flex-shrink-0" />
                                <h2 className="font-bold text-foreground">{s.title}</h2>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                        </div>
                    ))}
                </div>

                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
                    <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        {lang === 'vi' ? 'Quyền của bạn' : 'Your Rights'}
                    </h3>
                    <ul className="space-y-2">
                        {c.rights.map((r, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                <span>{r}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}