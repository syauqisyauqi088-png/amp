document.addEventListener('DOMContentLoaded', () => {
    // Data Modul dan Harga
    const modules = {
        'class-d': [
            { name: 'Ucd 250 non pro (HB)', price: 370000 },
            { name: 'Ucd 250 pro (HB)', price: 420000 },
            { name: 'Ucd superlite pro (HB)', price: 480000 },
            { name: 'd1k5 (HB)', price: 550000 },
            { name: 'd2k pro (HB)', price: 650000 },
            { name: 'd2k tiger (HB)', price: 750000 },
            { name: 'ucd 250 pro btl (HB)', price: 850000 },
            { name: 'd1k5 inbal ant feedback pro btl (HB)', price: 950000 },
            { name: 'd2k inbal pro btl (HB)', price: 1100000 },
            { name: 'd2k tiger pro btl (HB)', price: 1250000 },
            { name: 'D2k5 pro (FB)', price: 1400000 },
            { name: 'D2k9 Pro (FB)', price: 1650000 },
            { name: 'D3k5 Pro uvp (FB)', price: 1900000 },
            { name: 'Bd5k pro uvp ocp tcp (FB)', price: 2300000 },
            { name: 'D3k9 Pro (FB)', price: 2600000 },
            { name: 'Bas5k monster suppro (FB)', price: 3300000 },
            { name: 'D5k9 pro (FB)', price: 3950000 }
        ],
        'class-ab': [
            { name: 'ocl 150 btl', price: 135000 },
            { name: 'nexo 500', price: 185000 },
            { name: 'crown', price: 220000 },
            { name: 'nx14000', price: 265000 },
            { name: 'socl 506 btl', price: 145000 },
            { name: 'safarhy', price: 195000 },
            { name: 'nmax120', price: 235000 },
            { name: 'stvdio due btl', price: 325000 }
        ],
        'class-h': [
            { name: 'Socl 506 H 2u', price: 550000 },
            { name: 'MonsGF 3U', price: 750000 },
            { name: 'H sprbridge 3U btl', price: 1150000 },
            { name: 'H mini clon BU', price: 850000 },
            { name: 'H modif ab', price: 675000 }
        ],
        'class-td': [
            { name: 'Td 2.4', price: 1250000 },
            { name: 'Td.5.5', price: 1850000 },
            { name: 'Td 3.7', price: 2450000 },
            { name: 'TD 7K9 BTL UVP', price: 3600000 }
        ]
    };

    const FIXED_COSTS = 500000; // Estimasi Box + Paking/Ongkir
    const PRICE_PER_TR_SET = 65000; // Harga estimasi per set TR Final

    const ampClass = document.getElementById('ampClass');
    const ampModule = document.getElementById('ampModule');
    const smpsOption = document.getElementById('smpsOption');
    const trFinal = document.getElementById('trFinal');
    const subContainer = document.getElementById('subOptionContainer');
    const trContainer = document.getElementById('trFinalContainer');

    // Element display hasil
    const resAmp = document.getElementById('resAmp');
    const resTrFinal = document.getElementById('resTrFinal');
    const resSmps = document.getElementById('resSmps');
    const resTrRow = document.getElementById('resTrRow');
    const totalPrice = document.getElementById('totalPrice');

    function updateOptions() {
        const selectedClass = ampClass.value;
        ampModule.innerHTML = '';
        
        if (selectedClass && modules[selectedClass]) {
            subContainer.classList.remove('hidden');
            modules[selectedClass].forEach(mod => {
                const opt = document.createElement('option');
                opt.value = mod.price;
                opt.textContent = `${mod.name} - Rp ${mod.price.toLocaleString('id-ID')}`;
                ampModule.appendChild(opt);
            });

            // Tampilkan input TR Final hanya untuk Class AB
            if (selectedClass === 'class-ab') {
                trContainer.classList.remove('hidden');
            } else {
                trContainer.classList.add('hidden');
            }
        } else {
            subContainer.classList.add('hidden');
            trContainer.classList.add('hidden');
        }
        calculateTotal();
    }

    function calculateTotal() {
        const modVal = parseInt(ampModule.value) || 0;
        const smpsVal = parseInt(smpsOption.value) || 0;
        const isAB = ampClass.value === 'class-ab';
        
        let trVal = 0;
        if (isAB) {
            const count = parseInt(trFinal.value) || 0;
            trVal = count * PRICE_PER_TR_SET;
            resTrRow.classList.remove('hidden');
        } else {
            resTrRow.classList.add('hidden');
        }

        const total = modVal + smpsVal + trVal + FIXED_COSTS;

        // Tampilkan ke UI
        resAmp.textContent = `Rp ${modVal.toLocaleString('id-ID')}`;
        resSmps.textContent = `Rp ${smpsVal.toLocaleString('id-ID')}`;
        resTrFinal.textContent = `Rp ${trVal.toLocaleString('id-ID')}`;
        totalPrice.textContent = `Rp ${total.toLocaleString('id-ID')}`;
    }

    // Event Listeners
    ampClass.addEventListener('change', updateOptions);
    ampModule.addEventListener('change', calculateTotal);
    smpsOption.addEventListener('change', calculateTotal);
    trFinal.addEventListener('input', calculateTotal);
    
    document.getElementById('btnOrder').addEventListener('click', () => {
        const total = totalPrice.textContent;
        alert(`Pesanan telah masuk ke sistem estimasi.\nTotal: ${total}\nSilakan konfirmasi ke admin via chat.`);
    });

    // Initial load
    calculateTotal();
});