
import { useState, useEffect } from "react";
import { FaCheck, FaUser, FaBox, FaLock, FaExchangeAlt, FaMapMarkerAlt, FaCreditCard, FaBell, FaGift, FaQuestionCircle, FaTruck, FaPlus, FaEdit, FaTrash, FaTimes, FaPhone, FaEnvelope, FaUndo, FaCamera, FaFilePdf, FaFilter, FaSort, FaSearch, FaStar, FaRegClock, FaShoppingBag, FaChevronDown, FaEye, FaEyeSlash } from "react-icons/fa";
import img1 from "../../assets/breadcrumps/shopbread.jpg";
import { Link } from 'react-router-dom';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [showDescription, setShowDescription] = useState(false);
    const [returnRequests, setReturnRequests] = useState([]);
    const [activeTab, setActiveTab] = useState('Account overview');
    const [overviewOption, setOverviewOption] = useState('Profile Info');
    const [expandedOrders, setExpandedOrders] = useState({});
    const [expandedReturns, setExpandedReturns] = useState({});
    const [expandedReturnSections, setExpandedReturnSections] = useState({});
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false
    });
    const [formMessage, setFormMessage] = useState('');
    const [addresses, setAddresses] = useState([
        {
            id: 1,
            name: 'John Newman',
            street: '123 Main Street',
            city: 'New York',
            state: 'NY',
            zip: '10001',
            country: 'United States',
            phone: '+1 234 567 8901',
            isDefault: true
        },
        {
            id: 2,
            name: 'John Newman',
            street: '456 Park Avenue',
            city: 'Los Angeles',
            state: 'CA',
            zip: '90001',
            country: 'United States',
            phone: '+1 234 567 8901',
            isDefault: false
        }
    ]);
    const [newAddress, setNewAddress] = useState({
        name: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        phone: '',
        isDefault: false
    });
    const [isAddingAddress, setIsAddingAddress] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [paymentMethods, setPaymentMethods] = useState([
        {
            id: 1,
            type: 'creditCard',
            cardType: 'Visa',
            cardNumber: '•••• •••• •••• 1234',
            expiry: '12/25',
            cvv: '*',
            cardHolder: 'John Newman',
            upiId: '',
            paypalEmail: '',
            bankName: '',
            accountNumber: '',
            routingNumber: '',
            isDefault: true,
            saveCard: true,
            nickname: 'Personal Visa',
            status: 'active'
        }
    ]);
    const [newPaymentMethod, setNewPaymentMethod] = useState({
        type: 'creditCard',
        cardType: '',
        cardNumber: '',
        expiry: '',
        cvv: '',
        cardHolder: '',
        upiId: '',
        paypalEmail: '',
        bankName: '',
        accountNumber: '',
        routingNumber: '',
        isDefault: false,
        saveCard: true,
        nickname: '',
        status: 'active'
    });
    const [isAddingCard, setIsAddingCard] = useState(false);
    const [editingCard, setEditingCard] = useState(null);
    const [paymentVerificationMessage, setPaymentVerificationMessage] = useState('');
    const [trackOrderId, setTrackOrderId] = useState('');
    const [trackingResult, setTrackingResult] = useState(null);
    const [receiveNotifications, setReceiveNotifications] = useState(false);
    const [deliveryInstructions, setDeliveryInstructions] = useState('');
    const [liveTracking, setLiveTracking] = useState(false);
    const [locationUpdate, setLocationUpdate] = useState('');
    const [isCardFlipped, setIsCardFlipped] = useState(false);
    const [showReturnForm, setShowReturnForm] = useState(false);
    const [selectedReturnItems, setSelectedReturnItems] = useState([]);
    const [returnReason, setReturnReason] = useState('');
    const [returnCondition, setReturnCondition] = useState(false);
    const [returnImages, setReturnImages] = useState([]);
    const [returnMethod, setReturnMethod] = useState('');
    const [refundMethod, setRefundMethod] = useState('original');
    const [returnNotes, setReturnNotes] = useState('');
    const [returnRequestData, setReturnRequestData] = useState({
        orderId: '',
        items: []
    });
    const [giftCards, setGiftCards] = useState([
        {
            id: 1,
            code: 'GIFT123456',
            balance: 50.00,
            expiry: '12/31/2025',
            status: 'active'
        },
        {
            id: 2,
            code: 'GIFT789012',
            balance: 25.00,
            expiry: '06/30/2025',
            status: 'active'
        }
    ]);
    const [newGiftCard, setNewGiftCard] = useState({
        code: '',
        balance: 0,
        expiry: '',
        status: 'active'
    });
    const [isAddingGiftCard, setIsAddingGiftCard] = useState(false);
    const [showReasonPopup, setShowReasonPopup] = useState(false);
    const [currentReturnId, setCurrentReturnId] = useState(null);
    const [reasonInput, setReasonInput] = useState('');

    useEffect(() => {
        const mockOrders = [
            {
                id: '802682274',
                date: '04 Sep. 2023',
                status: 'Ordered',
                estimatedDelivery: 'Saturday 9th September 2023',
                total: 1250,
                items: [
                    { id: 1, title: 'Vanilla Dream Candle', price: 450, images: ['https://via.placeholder.com/100'], quantity: 2 },
                    { id: 2, title: 'Lavender Bliss Candle', price: 350, images: ['https://via.placeholder.com/100'], quantity: 1 }
                ]
            },
            {
                id: '802682275',
                date: '12 Oct. 2023',
                status: 'Delivered',
                estimatedDelivery: 'Monday 16th October 2023',
                total: 890,
                items: [
                    { id: 3, title: 'Citrus Zest Candle', price: 400, images: ['https://via.placeholder.com/100'], quantity: 1 },
                    { id: 4, title: 'Sandalwood Serenity Candle', price: 490, images: ['https://via.placeholder.com/100'], quantity: 1 }
                ]
            }
        ];
        setOrders(mockOrders);

        const mockReturns = [
            {
                id: 'RET001',
                orderId: '802682275',
                date: '15 Oct. 2023',
                status: 'Approved',
                statusSteps: [
                    { status: 'Return Requested', date: '15 Oct 2023', completed: true },
                    { status: 'Approved', date: '16 Oct 2023', completed: true },
                    { status: 'In Transit', date: '17 Oct 2023', completed: true },
                    { status: 'Item Received', date: '20 Oct 2023', completed: true },
                    { status: 'Refund Issued', date: '21 Oct 2023', completed: true }
                ],
                items: [
                    { 
                        id: 3, 
                        title: 'Citrus Zest Candle', 
                        price: 400, 
                        images: ['https://via.placeholder.com/100'], 
                        quantity: 1,
                        returnQty: 1,
                        condition: 'Unopened',
                        method: 'Courier Pickup',
                        refundMethod: 'original',
                        images: []
                    }
                ],
                canCancel: false,
                reason: ''
            },
            {
                id: 'RET002',
                orderId: '802682274',
                date: '06 Sep. 2023',
                status: 'Pending',
                statusSteps: [
                    { status: 'Return Requested', date: '06 Sep 2023', completed: true },
                    { status: 'Approved', date: '', completed: false },
                    { status: 'In Transit', date: '', completed: false },
                    { status: 'Item Received', date: '', completed: false },
                    { status: 'Refund Issued', date: '', completed: false }
                ],
                items: [
                    { 
                        id: 2, 
                        title: 'Lavender Bliss Candle', 
                        price: 350, 
                        images: ['https://via.placeholder.com/100'], 
                        quantity: 1,
                        returnQty: 1,
                        condition: 'As described',
                        method: 'Drop-off Point',
                        refundMethod: 'store-credit',
                        images: []
                    }
                ],
                canCancel: true,
                reason: ''
            }
        ];
        setReturnRequests(mockReturns);
    }, []);

    useEffect(() => {
        if (liveTracking && trackingResult && !trackingResult.error) {
            const interval = setInterval(() => {
                const statuses = ['In transit', 'At sorting facility', 'Out for delivery'];
                setLocationUpdate(statuses[Math.floor(Math.random() * statuses.length)]);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [liveTracking, trackingResult]);

    const toggleOrderDetails = (orderId) => {
        setExpandedOrders(prev => ({
            ...prev,
            [orderId]: !prev[orderId]
        }));
    };

    const toggleReturnDetails = (returnId) => {
        setExpandedReturns(prev => ({
            ...prev,
            [returnId]: !prev[returnId]
        }));
    };

    const toggleReturnSection = (returnId) => {
        setExpandedReturnSections(prev => ({
            ...prev,
            [returnId]: !prev[returnId]
        }));
    };

    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
        setFormMessage('');
    };

    const togglePasswordVisibility = (field) => {
        setShowPassword({ ...showPassword, [field]: !showPassword[field] });
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (passwordData.newPassword === passwordData.confirmPassword) {
            setFormMessage('Password changed successfully!');
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } else {
            setFormMessage('New password and confirm password do not match.');
        }
    };

    const handleAddressInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewAddress({
            ...newAddress,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleAddAddress = () => {
        if (newAddress.isDefault) {
            setAddresses(addresses.map(addr => ({ ...addr, isDefault: false })));
        }

        if (editingAddress) {
            setAddresses(addresses.map(addr => 
                addr.id === editingAddress.id ? { ...newAddress, id: editingAddress.id } : addr
            ));
        } else {
            setAddresses([...addresses, { ...newAddress, id: Date.now() }]);
        }

        setNewAddress({
            name: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            country: '',
            phone: '',
            isDefault: false
        });
        setIsAddingAddress(false);
        setEditingAddress(null);
    };

    const handleEditAddress = (address) => {
        setNewAddress(address);
        setEditingAddress(address);
        setIsAddingAddress(true);
    };

    const setDefaultAddress = (id) => {
        setAddresses(addresses.map(addr => ({
            ...addr,
            isDefault: addr.id === id
        })));
    };

    const deleteAddress = (id) => {
        setAddresses(addresses.filter(addr => addr.id !== id));
    };

    const detectCardType = (number) => {
        const cleaned = number.replace(/\D/g, '');
        if (/^4/.test(cleaned)) return 'Visa';
        if (/^5[1-5]/.test(cleaned)) return 'MasterCard';
        if (/^3[47]/.test(cleaned)) return 'Amex';
        return '';
    };

    const formatCardNumber = (number) => {
        const cleaned = number.replace(/\D/g, '');
        const groups = cleaned.match(/.{1,4}/g);
        return groups ? groups.join(' ') : cleaned;
    };

    const handlePaymentInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === 'type') {
            setNewPaymentMethod({
                type: value,
                cardType: '',
                cardNumber: '',
                expiry: '',
                cvv: '',
                cardHolder: '',
                upiId: '',
                paypalEmail: '',
                bankName: '',
                accountNumber: '',
                routingNumber: '',
                isDefault: false,
                saveCard: true,
                nickname: '',
                status: 'active'
            });
            setIsCardFlipped(false);
        } else if (name === 'cardNumber' && newPaymentMethod.type === 'creditCard') {
            const formatted = formatCardNumber(value);
            setNewPaymentMethod(prev => ({
                ...prev,
                cardNumber: formatted,
                cardType: detectCardType(value)
            }));
        } else {
            setNewPaymentMethod(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const verifyPaymentMethod = (method) => {
        if (method.type === 'creditCard') {
            const cardNumberRegex = /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/;
            const expiryRegex = /^(0[1-9]|1[0-2])\/[0-9]{2}$/;
            const cvvRegex = /^\d{3,4}$/;
            if (!cardNumberRegex.test(method.cardNumber)) {
                return 'Invalid card number';
            }
            if (!expiryRegex.test(method.expiry)) {
                return 'Invalid expiry date';
            }
            if (!cvvRegex.test(method.cvv)) {
                return 'Invalid CVV';
            }
            const [month, year] = method.expiry.split('/');
            const expiryDate = new Date(`20${year}`, month - 1);
            if (expiryDate < new Date()) {
                return 'Card is expired';
            }
        } else if (method.type === 'upi') {
            const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
            if (!upiRegex.test(method.upiId)) {
                return 'Invalid UPI ID';
            }
        } else if (method.type === 'paypal') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(method.paypalEmail)) {
                return 'Invalid PayPal email';
            }
        } else if (method.type === 'onlineBanking') {
            const accountNumberRegex = /^\d{9,18}$/;
            const routingNumberRegex = /^\d{9}$/;
            if (!accountNumberRegex.test(method.accountNumber)) {
                return 'Invalid account number';
            }
            if (!routingNumberRegex.test(method.routingNumber)) {
                return 'Invalid routing number';
            }
        }
        return 'Payment method verified successfully';
    };

    const handleAddPaymentMethod = () => {
        const verificationResult = verifyPaymentMethod(newPaymentMethod);
        if (!verificationResult.includes('successfully')) {
            setPaymentVerificationMessage(verificationResult);
            return;
        }

        const is3DSecureVerified = window.confirm('3D Secure Verification: Please confirm to proceed with adding this payment method.');
        if (!is3DSecureVerified) {
            setPaymentVerificationMessage('3D Secure verification cancelled.');
            return;
        }

        const methodData = {
            id: editingCard ? editingCard.id : Date.now(),
            type: newPaymentMethod.type,
            cardType: newPaymentMethod.cardType,
            isDefault: newPaymentMethod.isDefault,
            saveCard: newPaymentMethod.saveCard,
            nickname: newPaymentMethod.nickname || `${newPaymentMethod.type} ${Date.now().toString().slice(-4)}`,
            status: newPaymentMethod.type === 'creditCard' ? 
                (new Date(`20${newPaymentMethod.expiry.split('/')[1]}`, newPaymentMethod.expiry.split('/')[0] - 1) < new Date() ? 'expired' : 'active') : 'active',
            ...(newPaymentMethod.type === 'creditCard' && {
                cardNumber: newPaymentMethod.cardNumber,
                expiry: newPaymentMethod.expiry,
                cvv: newPaymentMethod.cvv,
                cardHolder: newPaymentMethod.cardHolder
            }),
            ...(newPaymentMethod.type === 'upi' && {
                upiId: newPaymentMethod.upiId
            }),
            ...(newPaymentMethod.type === 'paypal' && {
                paypalEmail: newPaymentMethod.paypalEmail
            }),
            ...(newPaymentMethod.type === 'onlineBanking' && {
                bankName: newPaymentMethod.bankName,
                accountNumber: newPaymentMethod.accountNumber,
                routingNumber: newPaymentMethod.routingNumber
            })
        };

        if (newPaymentMethod.isDefault) {
            setPaymentMethods(pm => pm.map(m => ({ ...m, isDefault: false })));
        }

        if (editingCard) {
            setPaymentMethods(pm => pm.map(m => 
                m.id === editingCard.id ? methodData : m
            ));
        } else {
            setPaymentMethods([...paymentMethods, methodData]);
        }

        setIsAddingCard(false);
        setEditingCard(null);
        setPaymentVerificationMessage('Payment method added successfully');
        setNewPaymentMethod({
            type: 'creditCard',
            cardType: '',
            cardNumber: '',
            expiry: '',
            cvv: '',
            cardHolder: '',
            upiId: '',
            paypalEmail: '',
            bankName: '',
            accountNumber: '',
            routingNumber: '',
            isDefault: false,
            saveCard: true,
            nickname: '',
            status: 'active'
        });
        setIsCardFlipped(false);
    };

    const deletePaymentMethod = (id) => {
        setPaymentMethods(paymentMethods.filter(pm => pm.id !== id));
    };

    const setDefaultPaymentMethod = (id) => {
        setPaymentMethods(paymentMethods.map(pm => ({
            ...pm,
            isDefault: pm.id === id
        })));
    };

    const handleCancelOrder = (orderId) => {
        setOrders(orders.map(order => 
            order.id === orderId ? { ...order, status: 'Cancelled' } : order
        ));
    };

    const handleReorder = (orderOrReturn) => {
        const items = orderOrReturn.items || orderOrReturn.items;
        alert(`Added ${items.length} items to cart!`);
    };

    const handleTrackOrder = () => {
        if (!trackOrderId) {
            setTrackingResult({ error: 'Please enter a valid Order ID' });
            return;
        }

        const order = orders.find(o => o.id === trackOrderId);
        if (!order) {
            setTrackingResult({ error: 'Order not found' });
            return;
        }

        const trackingData = {
            orderId: trackOrderId,
            status: order.status,
            estimatedDelivery: order.estimatedDelivery,
            trackingSteps: [
                { status: 'Order Placed', date: order.date, completed: true },
                { status: 'Processing', date: 'Processing', completed: order.status !== 'Ordered' },
                { status: 'Shipped', date: 'Shipped', completed: order.status === 'Delivered' },
                { status: 'Delivered', date: order.estimatedDelivery, completed: order.status === 'Delivered' }
            ]
        };

        setTrackingResult(trackingData);
        if (receiveNotifications) {
            alert('Tracking notifications enabled for Order ID: ' + trackOrderId);
        }
    };

    const isEligibleForReturn = (orderDate) => {
        const orderDateTime = new Date(orderDate).getTime();
        const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
        return orderDateTime > thirtyDaysAgo;
    };

    const initiateReturn = (order, items) => {
        setSelectedReturnItems(items);
        setShowReturnForm(true);
        setReturnRequestData({
            orderId: order.id,
            items: items.map(item => ({
                id: item.id,
                title: item.title,
                quantity: item.quantity,
                returnQty: item.quantity
            }))
        });
    };

    const handleReturnQtyChange = (itemId, value) => {
        setReturnRequestData(prev => ({
            ...prev,
            items: prev.items.map(item => 
                item.id === itemId 
                    ? { ...item, returnQty: parseInt(value) || 1 } 
                    : item
            )
        }));
    };

    const handleImageUpload = (files) => {
        const newImages = Array.from(files).map(file => URL.createObjectURL(file));
        setReturnImages(prev => [...prev, ...newImages]);
    };

    const resetReturnForm = () => {
        setSelectedReturnItems([]);
        setReturnReason('');
        setReturnCondition(false);
        setReturnImages([]);
        setReturnMethod('');
        setRefundMethod('original');
        setReturnNotes('');
        setReturnRequestData({ orderId: '', items: [] });
    };

    const handleReturnRequest = () => {
        if (!returnMethod) {
            alert('Please select a return method.');
            return;
        }

        const newReturn = {
            id: `RET${Date.now().toString().slice(-6)}`,
            orderId: returnRequestData.orderId,
            date: new Date().toLocaleDateString(),
            status: 'Pending',
            statusSteps: [
                { status: 'Return Requested', date: new Date().toLocaleDateString(), completed: true },
                { status: 'Approved', date: '', completed: false },
                { status: 'In Transit', date: '', completed: false },
                { status: 'Item Received', date: '', completed: false },
                { status: 'Refund Issued', date: '', completed: false }
            ],
            items: returnRequestData.items.map(item => ({
                ...item,
                price: orders.find(o => o.id === returnRequestData.orderId)?.items.find(i => i.id === item.id)?.price || 0,
                images: orders.find(o => o.id === returnRequestData.orderId)?.items.find(i => i.id === item.id)?.images || [],
                condition: returnCondition ? 'As described' : 'Not confirmed',
                method: returnMethod,
                refundMethod,
                images: returnImages
            })),
            canCancel: true,
            reason: ''
        };

        setReturnRequests([...returnRequests, newReturn]);
        setShowReturnForm(false);
        resetReturnForm();
    };

    const cancelReturn = (returnId) => {
        setReturnRequests(returnRequests.filter(r => r.id !== returnId));
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Ordered': return 'bg-blue-100 text-blue-800';
            case 'Delivered': return 'bg-green-100 text-green-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            case 'Approved': return 'bg-green-100 text-green-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Rejected': return 'bg-red-100 text-red-800';
            case 'active': return 'bg-green-100 text-green-800';
            case 'expired': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getETAProgress = (steps) => {
        if (!steps) return 0;
        const completedSteps = steps.filter(step => step.completed).length;
        return (completedSteps / steps.length) * 100;
    };

    const handleGiftCardInputChange = (e) => {
        const { name, value } = e.target;
        setNewGiftCard({
            ...newGiftCard,
            [name]: name === 'balance' ? parseFloat(value) || 0 : value
        });
    };

    const handleAddGiftCard = () => {
        if (!newGiftCard.code || newGiftCard.balance <= 0 || !newGiftCard.expiry) {
            alert('Please fill in all required fields with valid values.');
            return;
        }

        const giftCardData = {
            id: Date.now(),
            code: newGiftCard.code,
            balance: newGiftCard.balance,
            expiry: newGiftCard.expiry,
            status: 'active'
        };

        setGiftCards([...giftCards, giftCardData]);
        setNewGiftCard({
            code: '',
            balance: 0,
            expiry: '',
            status: 'active'
        });
        setIsAddingGiftCard(false);
    };

    const deleteGiftCard = (id) => {
        setGiftCards(giftCards.filter(card => card.id !== id));
    };

    const applyGiftCard = (code) => {
        alert(`Applying gift card ${code} to your next purchase!`);
    };

    const handleReasonSubmit = () => {
        if (reasonInput.trim()) {
            setReturnRequests(prev =>
                prev.map(returnItem =>
                    returnItem.id === currentReturnId
                        ? { ...returnItem, reason: reasonInput }
                        : returnItem
                )
            );
            setShowReasonPopup(false);
            setReasonInput('');
            setCurrentReturnId(null);
        } else {
            alert('Please enter a reason for the return.');
        }
    };

    const openReasonPopup = (returnId, existingReason = '') => {
        setCurrentReturnId(returnId);
        setReasonInput(existingReason);
        setShowReasonPopup(true);
    };

    const renderAccountOverview = () => (
        <div className="w-full p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
                <FaUser className="text-blue-500" />
                Account Overview
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
                <div className="md:col-span-1">
                    <ul className="space-y-2">
                        {['Profile Info', 'Order Summary', 'Support'].map((option) => (
                            <li key={option}>
                                <button
                                    className={`w-full px-4 py-3 text-left rounded-lg transition-all flex items-center gap-2 ${
                                        overviewOption === option 
                                        ? 'bg-blue-500 text-white shadow-md' 
                                        : 'hover:bg-gray-50 hover:shadow-sm text-gray-700'
                                    }`}
                                    onClick={() => setOverviewOption(option)}
                                >
                                    {option}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="md:col-span-3 p-6 bg-gray-50 rounded-xl">
                    {overviewOption === 'Profile Info' && (
                        <div className="space-y-6">
                            <h3 className="text-2xl font-semibold text-gray-800">Profile Information</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                                    <span className="font-medium w-32">Name:</span>
                                    <span className="text-gray-700">John Newman</span>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                                    <span className="font-medium w-32">Email:</span>
                                    <span className="text-gray-700">john@example.com</span>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                                    <span className="font-medium w-32">Phone:</span>
                                    <span className="text-gray-700">+123456789</span>
                                </div>
                            </div>
                        </div>
                    )}
                    {overviewOption === 'Order Summary' && (
                        <div className="space-y-6">
                            <h3 className="text-2xl font-semibold text-gray-800">Order Summary</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-white rounded-lg shadow-sm">
                                    <p className="text-sm text-gray-500">Total Orders</p>
                                    <p className="text-2xl font-bold text-blue-500">{orders.length}</p>
                                </div>
                                <div className="p-4 bg-white rounded-lg shadow-sm">
                                    <p className="text-sm text-gray-500">Last Order ID</p>
                                    <p className="text-lg font-medium text-gray-800">{orders[0]?.id || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    {overviewOption === 'Support' && (
                        <div className="space-y-6">
                            <h3 className="text-2xl font-semibold text-gray-800">Support Center</h3>
                            <div className="p-6 bg-white rounded-lg shadow-sm">
                                <p className="mb-4">If you need help, please contact our support team:</p>
                                <a href="mailto:support@example.com" className="text-blue-500 hover:underline font-medium">support@example.com</a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    const renderMyOrders = () => (
        <div className="w-full p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
                <FaBox className="text-blue-500" />
                My Orders
            </h2>
            {orders.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
                    <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
                        Start Shopping
                    </button>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                            <div className="grid md:grid-cols-3 gap-4 mb-4 pb-4 border-b">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Order ID</p>
                                    <p className="font-semibold text-gray-800">{order.id}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Date</p>
                                    <p className="text-gray-800">{order.date}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Status</p>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </div>
                                <div className="space-y-1 md:col-span-2">
                                    <p className="text-sm font-medium text-gray-500">Estimated Delivery</p>
                                    <p className="text-gray-800">{order.estimatedDelivery}</p>
                                </div>
                                <div className="space-y-1 text-right">
                                    <p className="text-sm font-medium text-gray-500">Total Amount</p>
                                    <p className="text-xl font-bold text-blue-500">₹{order.total}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => toggleOrderDetails(order.id)}
                                className="mb-4 text-left px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                            >
                                {expandedOrders[order.id] ? 'Hide Order Details' : 'View Order Details'}
                            </button>

                            {expandedOrders[order.id] && (
                                <div className="space-y-4">
                                    {order.items.map(item => (
                                        <div key={item.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition">
                                            <img 
                                                src={item.images[0]} 
                                                alt={item.title} 
                                                className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                                            />
                                            <div className="flex-1">
                                                <p className="font-semibold text-gray-800">{item.title}</p>
                                                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                            </div>
                                            <div className="text-lg font-bold text-blue-500">₹{item.price}</div>
                                            {isEligibleForReturn(order.date) && (
                                                <button
                                                    onClick={() => initiateReturn(order, [item])}
                                                    className="px-3 py-1 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition flex items-center gap-2"
                                                >
                                                    <FaUndo /> Return
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="flex gap-2 justify-end mt-4">
                                <button
                                    onClick={() => handleReorder(order)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                                >
                                    Reorder
                                </button>
                                {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                                    <button
                                        onClick={() => handleCancelOrder(order.id)}
                                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                    >
                                        Cancel Order
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    const renderMyReturns = () => {
        return (
            <div className="w-full p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
                    <FaExchangeAlt className="text-blue-500" />
                    My Returns
                </h2>

                {showReturnForm && (
                    <div className="mb-8 p-6 bg-gray-50 rounded-xl">
                        <h3 className="text-2xl font-semibold mb-4">Initiate Return</h3>
                        
                        <div className="mb-6">
                            <h4 className="text-lg font-medium mb-2">Select Items to Return</h4>
                            {selectedReturnItems.map(item => (
                                <div key={item.id} className="flex items-center gap-4 p-3 bg-white rounded-lg mb-2">
                                    <input 
                                        type="checkbox"
                                        checked={true}
                                        className="h-4 w-4"
                                        disabled
                                    />
                                    <span>{item.title}</span>
                                    <input
                                        type="number"
                                        min="1"
                                        max={item.quantity}
                                        defaultValue={item.quantity}
                                        className="w-20 px-2 py-1 border rounded"
                                        onChange={(e) => handleReturnQtyChange(item.id, e.target.value)}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="mb-6">
                            <h4 className="text-lg font-medium mb-2">Additional Notes</h4>
                            <textarea
                                placeholder="Enter any additional details..."
                                className="w-full p-2 border rounded-lg"
                                value={returnNotes}
                                onChange={(e) => setReturnNotes(e.target.value)}
                                rows="3"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={returnCondition}
                                    onChange={(e) => setReturnCondition(e.target.checked)}
                                    className="h-4 w-4"
                                />
                                <span>Item is unused, in original packaging with all tags attached</span>
                            </label>
                        </div>

                        <div className="mb-6">
                            <h4 className="text-lg font-medium mb-2">Upload Photos (Optional)</h4>
                            <div className="flex gap-4 flex-wrap">
                                {returnImages.length > 0 && returnImages.map((img, index) => (
                                    <div key={index} className="relative">
                                        <img src={img} alt={`Return-${index}`} className="w-24 h-24 object-cover rounded" />
                                        <button
                                            onClick={() => setReturnImages(prev => prev.filter((_, i) => i !== index))}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                                        >
                                            <FaTimes size={12} />
                                        </button>
                                    </div>
                                ))}
                                <label className="w-24 h-24 border-2 border-dashed rounded flex items-center justify-center cursor-pointer">
                                    <input
                                        type="file"
                                        multiple
                                        className="hidden"
                                        onChange={(e) => handleImageUpload(e.target.files)}
                                    />
                                    <FaCamera className="text-gray-500" />
                                </label>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h4 className="text-lg font-medium mb-2">Return Method</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {['Courier Pickup', 'Drop-off Point', 'Locker Return'].map(method => (
                                    <label
                                        key={method}
                                        className={`p-4 border rounded-lg cursor-pointer ${
                                            returnMethod === method ? 'border-blue-500 bg-blue-50' : ''
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="returnMethod"
                                            value={method}
                                            checked={returnMethod === method}
                                            onChange={(e) => setReturnMethod(e.target.value)}
                                            className="hidden"
                                        />
                                        {method}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="mb-6">
                            <h4 className="text-lg font-medium mb-2">Refund Method</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <label className={`p-4 border rounded-lg cursor-pointer ${
                                    refundMethod === 'original' ? 'border-blue-500 bg-blue-50' : ''
                                }`}>
                                    <input
                                        type="radio"
                                        name="refundMethod"
                                        value="original"
                                        checked={refundMethod === 'original'}
                                        onChange={(e) => setRefundMethod(e.target.value)}
                                        className="hidden"
                                    />
                                    Original Payment Method
                                </label>
                                <label className={`p-4 border rounded-lg cursor-pointer ${
                                    refundMethod === 'store-credit' ? 'border-blue-500 bg-blue-50' : ''
                                }`}>
                                    <input
                                        type="radio"
                                        name="refundMethod"
                                        value="store-credit"
                                        checked={refundMethod === 'store-credit'}
                                        onChange={(e) => setRefundMethod(e.target.value)}
                                        className="hidden"
                                    />
                                    Store Credit
                                </label>
                            </div>
                        </div>

                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowReturnForm(false)}
                                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleReturnRequest}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                Submit Return Request
                            </button>
                        </div>
                    </div>
                )}

                {showReasonPopup && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
                            <h3 className="text-xl font-semibold mb-4">Return Reason</h3>
                            <textarea
                                placeholder="Reason for the return"
                                className="w-full p-2 border rounded-lg mb-4"
                                value={reasonInput}
                                onChange={(e) => setReasonInput(e.target.value)}
                                rows="4"
                            />
                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={() => {
                                        setShowReasonPopup(false);
                                        setReasonInput('');
                                        setCurrentReturnId(null);
                                    }}
                                    className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleReasonSubmit}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                    Save Reason
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {returnRequests.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600 mb-4">You haven't initiated any returns yet.</p>
                        <button 
                            onClick={() => alert('Select an order to initiate a return')}
                            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
                        >
                            Start a Return
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {returnRequests.map((returnItem) => (
                            <div key={returnItem.id} className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                                <div className="grid md:grid-cols-3 gap-4 mb-4 pb-4 border-b">
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-gray-500">Return ID</p>
                                        <p className="font-semibold text-gray-800">{returnItem.id}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-gray-500">Order ID</p>
                                        <p className="text-gray-800">{returnItem.orderId}</p>
                                    </div>
                                    <div className="space-y-1 flex items-center justify-between">
                                        <div className="cursor-pointer" onClick={() => toggleReturnSection(returnItem.id)}>
                                            <p className="text-sm font-medium text-gray-500">Status</p>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(returnItem.status)}`}>
                                                {returnItem.status}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => toggleReturnSection(returnItem.id)}
                                            className="text-gray-500 hover:text-blue-500 transition"
                                        >
                                            <FaChevronDown />
                                        </button>
                                    </div>
                                    <div className="space-y-1 md:col-span-3">
                                        <p className="text-sm font-medium text-gray-500">Return Date</p>
                                        <p className="text-gray-800">{returnItem.date}</p>
                                    </div>
                                </div>

                                {expandedReturnSections[returnItem.id] && (
                                    <>
                                        <div className="mb-4 p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition">
                                            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleReturnDetails(returnItem.id)}>
                                                <h4 className="text-lg font-medium">View Return Details</h4>
                                                <FaChevronDown className={`text-gray-500 transition-transform ${expandedReturns[returnItem.id] ? 'rotate-180' : ''}`} />
                                            </div>
                                            {expandedReturns[returnItem.id] && (
                                                <div className="mt-4 space-y-4">
                                                    {returnItem.items.map(item => (
                                                        <div key={item.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition">
                                                            <img 
                                                                src={item.images[0]} 
                                                                alt={item.title} 
                                                                className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                                                            />
                                                            <div className="flex-1">
                                                                <p className="font-semibold text-gray-800">{item.title}</p>
                                                                <p className="text-sm text-gray-500">Quantity: {item.returnQty}</p>
                                                                <p className="text-sm text-gray-500">Condition: {item.condition}</p>
                                                                <p className="text-sm text-gray-500">Method: {item.method}</p>
                                                                <p className="text-sm text-gray-500">Refund: {item.refundMethod}</p>
                                                            </div>
                                                            <div className="text-lg font-bold text-blue-500">₹{item.price}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="mb-4 p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition">
                                            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleReturnDetails(returnItem.id + '-reason')}>
                                                <h4 className="text-lg font-medium">Reason</h4>
                                                <FaChevronDown className={`text-gray-500 transition-transform ${expandedReturns[returnItem.id + '-reason'] ? 'rotate-180' : ''}`} />
                                            </div>
                                            {expandedReturns[returnItem.id + '-reason'] && (
                                                <div className="mt-4">
                                                    <button
                                                        onClick={() => openReasonPopup(returnItem.id, returnItem.reason)}
                                                        className="mb-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                                                    >
                                                        Add/Edit Reason
                                                    </button>
                                                    {returnItem.reason && (
                                                        <div className="flex items-center gap-2">
                                                            <p className="text-sm text-gray-700">
                                                                <span className="font-medium">Reason:</span> {returnItem.reason}
                                                            </p>
                                                            <button
                                                                onClick={() => openReasonPopup(returnItem.id, returnItem.reason)}
                                                                className="text-gray-500 hover:text-blue-500 transition"
                                                            >
                                                                <FaEdit />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        <div className="mb-4 p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition">
                                            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleReturnDetails(returnItem.id + '-images')}>
                                                <h4 className="text-lg font-medium">Upload Images</h4>
                                                <FaChevronDown className={`text-gray-500 transition-transform ${expandedReturns[returnItem.id + '-images'] ? 'rotate-180' : ''}`} />
                                            </div>
                                            {expandedReturns[returnItem.id + '-images'] && (
                                                <div className="mt-4">
                                                    <label className="cursor-pointer text-gray-500 hover:text-blue-500 transition">
                                                        <input
                                                            type="file"
                                                            multiple
                                                            className="hidden"
                                                            onChange={(e) => handleImageUpload(e.target.files)}
                                                        />
                                                        Upload Images
                                                    </label>
                                                    {returnImages.length > 0 && (
                                                        <div className="flex gap-4 flex-wrap mt-4">
                                                            {returnImages.map((img, index) => (
                                                                <div key={index} className="relative">
                                                                    <img src={img} alt={`Return-${index}`} className="w-24 h-24 object-cover rounded" />
                                                                    <button
                                                                        onClick={() => setReturnImages(prev => prev.filter((_, i) => i !== index))}
                                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                                                                    >
                                                                        <FaTimes size={12} />
                                                                    </button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        <div className="mb-4 p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition">
                                            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleReturnDetails(returnItem.id + '-documents')}>
                                                <h4 className="text-lg font-medium">Documents</h4>
                                                <FaChevronDown className={`text-gray-500 transition-transform ${expandedReturns[returnItem.id + '-documents'] ? 'rotate-180' : ''}`} />
                                            </div>
                                            {expandedReturns[returnItem.id + '-documents'] && (
                                                <div className="mt-4 space-y-2">
                                                    <div className="flex justify-between items-center">
                                                        <button
                                                            onClick={() => {
                                                                const link = document.createElement('a');
                                                                link.href = '/path/to/receipt.pdf'; // Replace with actual receipt URL
                                                                link.download = `Return_Receipt_${returnItem.id}.pdf`;
                                                                link.click();
                                                            }}
                                                            className="text-blue-500 hover:underline flex items-center gap-2"
                                                        >
                                                            Download Receipt
                                                        </button>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <button
                                                            onClick={() => {
                                                                const link = document.createElement('a');
                                                                link.href = '/path/to/label.pdf'; // Replace with actual label URL
                                                                link.download = `Return_Label_${returnItem.id}.pdf`;
                                                                link.click();
                                                            }}
                                                            className="text-blue-500 hover:underline flex items-center gap-2"
                                                        >
                                                            Download Label
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="mb-4 p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition">
                                            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleReturnDetails(returnItem.id + '-eta')}>
                                                <h4 className="text-lg font-medium">ETA Progress</h4>
                                                <FaChevronDown className={`text-gray-500 transition-transform ${expandedReturns[returnItem.id + '-eta'] ? 'rotate-180' : ''}`} />
                                            </div>
                                            {expandedReturns[returnItem.id + '-eta'] && (
                                                <div className="mt-4">
                                                    <div className="relative pl-8 space-y-6">
                                                        {returnItem.statusSteps.map((step, index) => (
                                                            <div key={index} className="flex items-start gap-4">
                                                                <div className="absolute left-0 w-4 h-4 rounded-full flex items-center justify-center bg-blue-500 text-white">
                                                                    {step.completed ? <FaCheck className="text-xs" /> : index + 1}
                                                                </div>
                                                                <div className="flex-1">
                                                                    <p className="font-medium">{step.status}</p>
                                                                    {step.date && <p className="text-sm text-gray-500">{step.date}</p>}
                                                                </div>
                                                                {index < returnItem.statusSteps.length - 1 && (
                                                                    <div className="absolute left-1.5 w-0.5 h-12 bg-blue-500" style={{ top: '1rem' }}></div>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <div className="text-sm text-gray-600">
                                                {returnItem.canCancel && (
                                                    <button
                                                        onClick={() => cancelReturn(returnItem.id)}
                                                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center gap-2"
                                                    >
                                                        <FaTimes /> Cancel Return
                                                    </button>
                                                )}
                                            </div>
                                            <button
                                                onClick={() => handleReorder(returnItem)}
                                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
                                            >
                                                <FaUndo /> Reorder Items
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    const renderChangePassword = () => {
        const labelMap = {
            currentPassword: 'Current Password',
            newPassword: 'New Password',
            confirmPassword: 'Confirm Password'
        };

        return (
            <div className="w-full max-w-xl p-8 mx-auto bg-white rounded-2xl shadow-lg border border-gray-100">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <FaLock className="text-blue-500" />
                    Change Password
                </h2>
                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                    {['currentPassword', 'newPassword', 'confirmPassword'].map((field) => (
                        <div key={field} className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">{labelMap[field]}</label>
                            <div className="relative">
                                <input
                                    type={showPassword[field] ? 'text' : 'password'}
                                    name={field}
                                    value={passwordData[field]}
                                    onChange={handlePasswordChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-3.5 text-gray-500 hover:text-blue-500 transition"
                                    onClick={() => togglePasswordVisibility(field)}
                                >
                                    {showPassword[field] ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>
                    ))}

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all"
                    >
                        Update Password
                    </button>

                    {formMessage && (
                        <div className={`mt-4 p-3 rounded-lg text-center ${
                            formMessage.includes('success') 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                            {formMessage}
                        </div>
                    )}
                </form>
            </div>
        );
    };

    const renderAddressBook = () => (
        <div className="w-full p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-blue-500" />
                    Address Book
                </h2>
                <button 
                    onClick={() => {
                        setIsAddingAddress(true);
                        setEditingAddress(null);
                        setNewAddress({
                            name: '',
                            street: '',
                            city: '',
                            state: '',
                            zip: '',
                            country: '',
                            phone: '',
                            isDefault: false
                        });
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition"
                >
                    <FaPlus /> Add New Address
                </button>
            </div>
            {isAddingAddress && (
                <div className="mb-8 p-6 bg-gray-50 rounded-xl">
                    <h3 className="text-xl font-semibold mb-4">
                        {editingAddress ? 'Edit Address' : 'Add New Address'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={newAddress.name}
                                onChange={handleAddressInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={newAddress.phone}
                                onChange={handleAddressInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                required
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                            <input
                                type="text"
                                name="street"
                                value={newAddress.street}
                                onChange={handleAddressInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                            <input
                                type="text"
                                name="city"
                                value={newAddress.city}
                                onChange={handleAddressInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                            <input
                                type="text"
                                name="state"
                                value={newAddress.state}
                                onChange={handleAddressInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">ZIP/Postal Code</label>
                            <input
                                type="text"
                                name="zip"
                                value={newAddress.zip}
                                onChange={handleAddressInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                            <input
                                type="text"
                                name="country"
                                value={newAddress.country}
                                onChange={handleAddressInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                required
                            />
                        </div>
                        <div className="md:col-span-2 flex items-center">
                            <input
                                type="checkbox"
                                name="isDefault"
                                checked={newAddress.isDefault}
                                onChange={handleAddressInputChange}
                                className="mr-2"
                                id="defaultAddress"
                            />
                            <label htmlFor="defaultAddress" className="text-sm font-medium text-gray-700">
                                Set as default shipping address
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => setIsAddingAddress(false)}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleAddAddress}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                        >
                            Save Address
                        </button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {addresses.map(address => (
                    <div key={address.id} className={`p-6 rounded-xl border ${address.isDefault ? 'border-blue-500' : 'border-gray-200'} relative`}>
                        {address.isDefault && (
                            <span className="absolute -top-3 left-4 bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                                Default
                            </span>
                        )}
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-semibold">{address.name}</h3>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => handleEditAddress(address)}
                                    className="text-gray-500 hover:text-blue-500 transition"
                                >
                                    <FaEdit />
                                </button>
                                <button 
                                    onClick={() => deleteAddress(address.id)}
                                    className="text-gray-500 hover:text-red-500 transition"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                        <p className="text-gray-700">{address.street}</p>
                        <p className="text-gray-700">{address.city}, {address.state} {address.zip}</p>
                        <p className="text-gray-700">{address.country}</p>
                        <p className="text-gray-700 mt-2">{address.phone}</p>
                        {!address.isDefault && (
                            <button
                                onClick={() => setDefaultAddress(address.id)}
                                className="mt-4 text-blue-500 hover:text-blue-600 text-sm font-medium"
                            >
                                Set as default
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

    const renderPaymentMethods = () => (
        <div className="w-full p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                    <FaCreditCard className="text-blue-500" />
                    Payment Methods
                </h2>
                <button 
                    onClick={() => {
                        setIsAddingCard(true);
                        setEditingCard(null);
                        setNewPaymentMethod({
                            type: 'creditCard',
                            cardType: '',
                            cardNumber: '',
                            expiry: '',
                            cvv: '',
                            cardHolder: '',
                            upiId: '',
                            paypalEmail: '',
                            bankName: '',
                            accountNumber: '',
                            routingNumber: '',
                            isDefault: false,
                            saveCard: true,
                            nickname: '',
                            status: 'active'
                        });
                        setIsCardFlipped(false);
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition"
                >
                    <FaPlus /> Add Payment Method
                </button>
            </div>

            {isAddingCard && (
                <div className="mb-8 p-6 bg-gray-50 rounded-xl">
                    <h3 className="text-xl font-semibold mb-4">
                        {editingCard ? 'Edit Payment Method' : 'Add New Payment Method'}
                    </h3>
                    
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Payment Type</label>
                        <select
                            name="type"
                            value={newPaymentMethod.type}
                            onChange={handlePaymentInputChange}
                            className="w-full p-2 border rounded-lg"
                        >
                            <option value="creditCard">Credit/Debit Card</option>
                            <option value="upi">UPI</option>
                            <option value="paypal">PayPal</option>
                            <option value="onlineBanking">Online Banking</option>
                        </select>
                    </div>

                    {newPaymentMethod.type === 'creditCard' && (
                        <div className="space-y-4">
                            <div 
                                className="card-container"
                                onClick={() => setIsCardFlipped(!isCardFlipped)}
                            >
                                <div className={`card-wrapper ${isCardFlipped ? 'card-flipped' : ''}`}>
                                    <div className="card-front">
                                        <div className="card-logo">
                                            {newPaymentMethod.cardType || 'CARD'}
                                        </div>
                                        <div className="card-chip"></div>
                                        <div className="card-number">
                                            {newPaymentMethod.cardNumber || '•••• •••• •••• ••••'}
                                        </div>
                                        <div className="card-details">
                                            <div>
                                                <div className="text-xs text-white/70">CARD HOLDER</div>
                                                <div className="text-sm">
                                                    {newPaymentMethod.cardHolder.toUpperCase() || 'YOUR NAME'}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-white/70">EXPIRES</div>
                                                <div className="text-sm">
                                                    {newPaymentMethod.expiry || '••/••'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-back">
                                        <div className="cvv-strip">
                                            <span className="text-black">
                                                {newPaymentMethod.cvv || '•••'}
                                            </span>
                                        </div>
                                        <div className="text-white mt-4 text-xs px-4">
                                            This is a mock card display for demonstration purposes only.
                                            No real payment information is being collected.
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Card Number
                                    </label>
                                    <input
                                        type="text"
                                        name="cardNumber"
                                        value={newPaymentMethod.cardNumber}
                                        onChange={handlePaymentInputChange}
                                        placeholder="0000 0000 0000 0000"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Card Holder Name
                                    </label>
                                    <input
                                        type="text"
                                        name="cardHolder"
                                        value={newPaymentMethod.cardHolder}
                                        onChange={handlePaymentInputChange}
                                        placeholder="John Doe"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Expiry Date (MM/YY)
                                    </label>
                                    <input
                                        type="text"
                                        name="expiry"
                                        value={newPaymentMethod.expiry}
                                        onChange={handlePaymentInputChange}
                                        placeholder="MM/YY"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                        required
                                        maxLength="5"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        CVV
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="cvv"
                                            value={newPaymentMethod.cvv}
                                            onChange={handlePaymentInputChange}
                                            placeholder="123"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                            required
                                            maxLength="4"
                                            onFocus={() => setIsCardFlipped(true)}
                                            onBlur={() => setIsCardFlipped(false)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {newPaymentMethod.type === 'upi' && (
                        <div className="space-y-4">
                            <div className="bg-blue-50 p-6 rounded-xl">
                                <div className="flex items-center justify-center mb-4">
                                    <div className="bg-white p-3 rounded-full shadow-md">
                                        <FaCreditCard className="text-blue-500 text-xl" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
                                    <input
                                        type="text"
                                        name="upiId"
                                        value={newPaymentMethod.upiId}
                                        onChange={handlePaymentInputChange}
                                        placeholder="username@upi"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {newPaymentMethod.type === 'paypal' && (
                        <div className="space-y-4">
                            <div className="bg-blue-50 p-6 rounded-xl">
                                <div className="flex items-center justify-center mb-4">
                                    <div className="bg-white p-3 rounded-full shadow-md">
                                        <FaCreditCard className="text-blue-500 text-xl" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">PayPal Email</label>
                                    <input
                                        type="email"
                                        name="paypalEmail"
                                        value={newPaymentMethod.paypalEmail}
                                        onChange={handlePaymentInputChange}
                                        placeholder="email@example.com"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {newPaymentMethod.type === 'onlineBanking' && (
                        <div className="space-y-4">
                            <div className="bg-blue-50 p-6 rounded-xl">
                                <div className="flex items-center justify-center mb-4">
                                    <div className="bg-white p-3 rounded-full shadow-md">
                                        <FaCreditCard className="text-blue-500 text-xl" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                                        <input
                                            type="text"
                                            name="bankName"
                                            value={newPaymentMethod.bankName}
                                            onChange={handlePaymentInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                                        <input
                                            type="text"
                                            name="accountNumber"
                                            value={newPaymentMethod.accountNumber}
                                            onChange={handlePaymentInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Routing Number</label>
                                        <input
                                            type="text"
                                            name="routingNumber"
                                            value={newPaymentMethod.routingNumber}
                                            onChange={handlePaymentInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Account Holder Name</label>
                                        <input
                                            type="text"
                                            name="cardHolder"
                                            value={newPaymentMethod.cardHolder}
                                            onChange={handlePaymentInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center justify-between mt-6">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="isDefault"
                                checked={newPaymentMethod.isDefault}
                                onChange={handlePaymentInputChange}
                                id="defaultPayment"
                                className="mr-2"
                            />
                            <label htmlFor="defaultPayment" className="text-sm font-medium text-gray-700">
                                Set as default payment method
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="saveCard"
                                checked={newPaymentMethod.saveCard}
                                onChange={handlePaymentInputChange}
                                id="savePayment"
                                className="mr-2"
                            />
                            <label htmlFor="savePayment" className="text-sm font-medium text-gray-700">
                                Save for future payments
                            </label>
                        </div>
                    </div>

                   
                    {paymentVerificationMessage && (
                        <div className={`mt-4 p-3 rounded-lg text-center ${
                            paymentVerificationMessage.includes('success') 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                            {paymentVerificationMessage}
                        </div>
                    )}

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            onClick={() => setIsAddingCard(false)}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleAddPaymentMethod}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                        >
                            Save Payment Method
                        </button>
                    </div>
                </div>
            )}

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paymentMethods.map(method => (
                    <div key={method.id} className={`p-6 rounded-xl border ${method.isDefault ? 'border-blue-500' : 'border-gray-200'} relative`}>
                        {method.isDefault && (
                            <span className="absolute -top-3 left-4 bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                                Default
                            </span>
                        )}
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-semibold capitalize">{method.type.replace(/([A-Z])/g, ' $1').trim()}</h3>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => {
                                        setEditingCard(method);
                                        setNewPaymentMethod(method);
                                        setIsAddingCard(true);
                                    }}
                                    className="text-gray-500 hover:text-blue-500 transition"
                                >
                                    <FaEdit />
                                </button>
                                <button 
                                    onClick={() => deletePaymentMethod(method.id)}
                                    className="text-gray-500 hover:text-red-500 transition"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                         {method.type === 'creditCard' && (
                            <>
                                <p className="text-gray-700">{method.cardType} ending in {method.cardNumber.slice(-4)}</p>
                                <p className="text-gray-700">Expires: {method.expiry}</p>
                                <p className="text-gray-700">Card Holder: {method.cardHolder}</p>
                            </>
                        )}
                        {method.type === 'upi' && (
                            <p className="text-gray-700">UPI ID: {method.upiId}</p>
                        )}
                        {method.type === 'paypal' && (
                            <p className="text-gray-700">PayPal Email: {method.paypalEmail}</p>
                        )}
                        {method.type === 'onlineBanking' && (
                            <>
                                <p className="text-gray-700">Bank: {method.bankName}</p>
                                <p className="text-gray-700">Account ending in: {method.accountNumber.slice(-4)}</p>
                            </>
                        )}
                        <p className="text-sm mt-2">
                            Status: <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(method.status)}`}>{method.status}</span>
                        </p>
                        {!method.isDefault && (
                            <button
                                onClick={() => setDefaultPaymentMethod(method.id)}
                                className="mt-4 text-blue-500 hover:text-blue-600 text-sm font-medium"
                            >
                                Set as default
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

   const renderTrackOrder = () => (
        <div className="w-full p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
                <FaTruck className="text-blue-500" />
                Track Order
            </h2>
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Order ID</label>
                        <input
                            type="text"
                            value={trackOrderId}
                            onChange={(e) => setTrackOrderId(e.target.value)}
                            placeholder="Enter Order ID"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <button
                        onClick={handleTrackOrder}
                        className="mt-6 md:mt-0 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
                    >
                        <FaSearch /> Track
                    </button>
                </div>

                <div className="flex items-center gap-4">
                    <input
                        type="checkbox"
                        checked={receiveNotifications}
                        onChange={(e) => setReceiveNotifications(e.target.checked)}
                        id="notifications"
                        className="h-4 w-4" />
                    <label htmlFor="notifications" className="text-sm font-medium text-gray-700">
                        Receive tracking notifications
                    </label>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Instructions</label>
                    <textarea
                        value={deliveryInstructions}
                        onChange={(e) => setDeliveryInstructions(e.target.value)}
                        placeholder="E.g., Leave at front door"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        rows="3"
                    />
                </div>

                {trackingResult && (
                    <div className="p-6 bg-gray-50 rounded-xl">
                        {trackingResult.error ? (
                            <p className="text-red-600">{trackingResult.error}</p>
                        ) : (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">Order #{trackingResult.orderId}</h3>
                                    <p className="text-sm text-gray-500">Status: <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(trackingResult.status)}`}>{trackingResult.status}</span></p>
                                    <p className="text-sm text-gray-500">Estimated Delivery: {trackingResult.estimatedDelivery}</p>
                                </div>

                                <div className="relative pl-8 space-y-6">
                                    {trackingResult.trackingSteps.map((step, index) => (
                                        <div key={index} className="flex items-start gap-4">
                                            <div className="absolute left-0 w-4 h-4 rounded-full flex items-center justify-center bg-blue-500 text-white">
                                                {step.completed ? <FaCheck className="text-xs" /> : index + 1}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium">{step.status}</p>
                                                {step.date && <p className="text-sm text-gray-500">{step.date}</p>}
                                            </div>
                                            {index < trackingResult.trackingSteps.length - 1 && (
                                                <div className="absolute left-1.5 w-0.5 h-12 bg-blue-500" style={{ top: '1rem' }}></div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center gap-4">
                                    <input
                                        type="checkbox"
                                        checked={liveTracking}
                                        onChange={(e) => setLiveTracking(e.target.checked)}
                                        id="liveTracking"
                                        className="h-4 w-4"
                                    />
                                    <label htmlFor="liveTracking" className="text-sm font-medium text-gray-700">
                                        Enable live tracking
                                    </label>
                                </div>
                           
                                {liveTracking && locationUpdate && (
                                    <div className="p-4 bg-blue-50 rounded-lg">
                                        <p className="text-sm text-gray-700">Live Update: <span className="font-medium">{locationUpdate}</span></p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );

    const renderGiftCards = () => (
        <div className="w-full p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                    <FaGift className="text-blue-500" />
                    Gift Cards
                </h2>
                <button
                    onClick={() => {
                        setIsAddingGiftCard(true);
                        setNewGiftCard({ code: '', balance: 0, expiry: '', status: 'active' });
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition"
                >
                    <FaPlus /> Add Gift Card
                </button>
            </div>

            {isAddingGiftCard && (
                <div className="mb-8 p-6 bg-gray-50 rounded-xl">
                    <h3 className="text-xl font-semibold mb-4">Add New Gift Card</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Gift Card Code</label>
                            <input
                                type="text"
                                name="code"
                                value={newGiftCard.code}
                                onChange={handleGiftCardInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Balance</label>
                            <input
                                type="number"
                                name="balance"
                                value={newGiftCard.balance}
                                onChange={handleGiftCardInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                            <input
                                type="text"
                                name="expiry"
                                value={newGiftCard.expiry}
                                onChange={handleGiftCardInputChange}
                                placeholder="MM/DD/YYYY"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                required
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => setIsAddingGiftCard(false)}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleAddGiftCard}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                        >
                            Save Gift Card
                        </button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {giftCards.map(card => (
                    <div key={card.id} className="p-6 rounded-xl border border-gray-200 relative">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-semibold">Gift Card #{card.code}</h3>
                            <button
                                onClick={() => deleteGiftCard(card.id)}
                                className="text-gray-500 hover:text-red-500 transition"
                            >
                                <FaTrash />
                            </button>
                        </div>
                        <p className="text-gray-700">Balance: ${card.balance.toFixed(2)}</p>
                        <p className="text-gray-700">Expires: {card.expiry}</p>
                        <p className="text-sm mt-2">
                            Status: <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(card.status)}`}>{card.status}</span>
                        </p>
                        <button
                            onClick={() => applyGiftCard(card.code)}
                            className="mt-4 text-blue-500 hover:text-blue-600 text-sm font-medium"
                        >
                            Apply to Next Purchase
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="relative h-64 md:h-96 lg:h-[70vh] bg-cover bg-center" style={{ backgroundImage: `url(${img1})` }}>
 <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center text-white">
  <h1 className="text-[30px] md:text-[50px] lg:text-[60px] pb-2 font-bold drop-shadow-lg">
    My Orders
  </h1>
  <p className="text-lg drop-shadow-md">Manage your orders and preferences</p>
</div>
</div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid md:grid-cols-12 gap-8">
                    <div className="md:col-span-3">
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Account Menu</h3>
                            <ul className="space-y-2">
                                {[
                                    { name: 'Account overview', icon: <FaUser /> },
                                    { name: 'My Orders', icon: <FaBox /> },
                                    { name: 'My Returns', icon: <FaExchangeAlt /> },
                                    { name: 'Change Password', icon: <FaLock /> },
                                    { name: 'Address Book', icon: <FaMapMarkerAlt /> },
                                    { name: 'Payment Methods', icon: <FaCreditCard /> },
                                    { name: 'Track Order', icon: <FaTruck /> },
                                    { name: 'Gift Cards', icon: <FaGift /> }
                                ].map(tab => (
                                    <li key={tab.name}>
                                        <button
                                            className={`w-full flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${
                                                activeTab === tab.name
                                                    ? 'bg-blue-500 text-white shadow-md'
                                                    : 'hover:bg-gray-50 hover:shadow-sm text-gray-700'
                                            }`}
                                            onClick={() => setActiveTab(tab.name)}
                                        >
                                            {tab.icon} {tab.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="md:col-span-9">
                        {activeTab === 'Account overview' && renderAccountOverview()}
                        {activeTab === 'My Orders' && renderMyOrders()}
                        {activeTab === 'My Returns' && renderMyReturns()}
                        {activeTab === 'Change Password' && renderChangePassword()}
                        {activeTab === 'Address Book' && renderAddressBook()}
                        {activeTab === 'Payment Methods' && renderPaymentMethods()}
                        {activeTab === 'Track Order' && renderTrackOrder()}
                        {activeTab === 'Gift Cards' && renderGiftCards()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Orders;