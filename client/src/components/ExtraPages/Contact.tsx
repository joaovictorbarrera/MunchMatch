export default function Contact() {
    return (
        <div className="flex flex-col my-10 lg:my-20 px-10">
            <h2 className="text-mm-text text-2xl lg:text-3xl">Contact</h2>
            <div className="flex flex-col gap-10 mt-5 text-sm sm:text-xl text-wrap">
                <p>We'd love to hear from you! Whether you have questions, feedback, or need support, feel free to reach out to us.</p>

                <div className="flex flex-col">
                    <span className="flex gap-2">
                        <span>📧</span>
                        <strong>Email:</strong>
                        <span>support@munchmatch.com</span>
                    </span>

                    <span className="flex gap-2">
                        <span>📍</span>
                        <strong>Address:</strong>
                        <span>123 Healthy Living Street, Orlando, FL, USA</span>
                    </span>

                    <span className="flex gap-2">
                        <span>📞</span>
                        <strong>Phone:</strong>
                        <span>+1 (407) 123-4567</span>
                    </span>
                </div>

                <p>You can also follow us on social media for updates and tips on healthy eating!</p>

                <div className="flex flex-col">
                    <span className="flex gap-2">
                        <span>🔗</span>
                        <strong>Facebook:</strong>
                        <span>facebook.com/munchmatch</span>
                    </span>

                    <span className="flex gap-2">
                        <span>🔗</span>
                        <strong>Instagram:</strong>
                        <span>instagram.com/munchmatch</span>
                    </span>

                    <span className="flex gap-2">
                        <span>🔗</span>
                        <strong>Twitter:</strong>
                        <span>twitter.com/munchmatch</span>
                    </span>
                </div>
            </div>
        </div>
    )
}
