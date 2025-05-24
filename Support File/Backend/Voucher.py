from flask import Flask, render_template, request
from datetime import datetime

app = Flask(__name__)

# Simulasi database voucher
vouchers = {
    'DISKON10': {
        'type': 'percentage',
        'value': 10,
        'is_active': True,
        'expires_at': datetime(2025, 6, 30)
    },
    'POTONG5000': {
        'type': 'fixed',
        'value': 5000,
        'is_active': True,
        'expires_at': datetime(2025, 7, 15)
    }
}

@app.route('/checkout', methods=['GET'])
def checkout():
    return render_template('checkout.html')

@app.route('/apply-voucher', methods=['POST'])
def apply_voucher():
    code = request.form.get('voucher_code', '').strip().upper()
    subtotal = 80000
    voucher = vouchers.get(code)

    if not voucher or not voucher['is_active']:
        return render_template('checkout.html', error='Voucher tidak valid.')

    if voucher['expires_at'] < datetime.now():
        return render_template('checkout.html', error='Voucher telah kedaluwarsa.')

    # Hitung diskon
    if voucher['type'] == 'percentage':
        discount = int(subtotal * voucher['value'] / 100)
    elif voucher['type'] == 'fixed':
        discount = voucher['value']
    else:
        discount = 0

    total_after_discount = max(subtotal - discount, 0)

    return render_template(
        'checkout.html',
        discount=discount,
        total_after_discount=total_after_discount
    )

@app.route('/bayar', methods=['POST'])
def bayar():
    total = int(request.form.get('total'))
    return f"<h1>Pembayaran berhasil sebesar Rp {total:,}</h1>"

if __name__ == '__main__':
    app.run(debug=True)
