import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

export default function ContactSection() {
    const { t } = useLang();

    const CONTACT_INFO = [
        { icon: Phone, label: t('contact.phoneLabel'), value: '0912 345 678' },
        { icon: Mail, label: t('contact.emailLabel'), value: 'contact@phuvinhmaytredan.vn' },
        { icon: MapPin, label: t('contact.addressLabel'), value: t('contact.address') },
        { icon: Clock, label: t('contact.hoursLabel'), value: t('contact.hours') },
    ];

    return (
        <section id="contact" className="py-24 relative">
            <div className="container mx-auto px-4 max-w-5xl">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                    <p className="text-center text-xs uppercase tracking-[0.2em] text-primary/70 mb-3">{t('contact.badge')}</p>
                    <h2 className="text-3xl md:text-5xl font-bold text-center text-foreground mb-3">{t('contact.title')}</h2>
                    <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">{t('contact.desc')}</p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        {CONTACT_INFO.map((info, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                                    <info.icon className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">{info.label}</p>
                                    <p className="text-foreground font-medium">{info.value}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                        className="p-6 rounded-2xl bg-secondary/30 border border-border/30">
                        <h3 className="text-lg font-bold text-foreground mb-6">{t('contact.form')}</h3>
                        <div className="space-y-4">
                            <input type="text" placeholder={t('contact.name')}
                                className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 text-foreground placeholder:text-muted-foreground text-sm outline-none focus:border-primary/50 transition-colors" />
                            <input type="text" placeholder={t('contact.phone')}
                                className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 text-foreground placeholder:text-muted-foreground text-sm outline-none focus:border-primary/50 transition-colors" />
                            <input type="email" placeholder={t('contact.email')}
                                className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 text-foreground placeholder:text-muted-foreground text-sm outline-none focus:border-primary/50 transition-colors" />
                            <textarea placeholder={t('contact.message')} rows={4}
                                className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 text-foreground placeholder:text-muted-foreground text-sm outline-none focus:border-primary/50 transition-colors resize-none" />
                            <button className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
                                {t('contact.submit')}
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}