
import { useState } from "react";

export const useTicketRegisterController = () => {
    const [companyName, setCompanyName] = useState('');
    const [companyBudget, setCompanyBudget] = useState('');
    const [dateReport, setDateReport] = useState('');
    const [priorityLevel, setPriorityLevel] = useState('');
    const [priorityReason, setPriorityReason] = useState('');
    const [errorFound, setErrorFound] = useState('');
    const [linkTicket, setLinkTicket] = useState('');

    const [errorMessageCompanyName, setErrorMessageCompanyName] = useState('');
    const [errorMessageCompanyBudget, setErrorMessageCompanyBudget] = useState('');
    const [errorMessageDateReport, setErrorMessageDateReport] = useState('');
    const [errorMessagePriorityLevel, setErrorMessagePriorityLevel] = useState('');
    const [errorMessagePriorityReason, setErrorMessagePriorityReason] = useState('');
    const [errorMessageErrorFound, setErrorMessageErrorFound] = useState('');
    const [errorMessageLinkTicket, setErrorMessageLinkTicket] = useState('');


    const [showSuccessModal, setshowSuccessModal] = useState(false)

    const resetFields = () => {
        setCompanyName("");
        setCompanyBudget("");
        setDateReport("");
        setPriorityLevel("");
        setPriorityReason("");
        setLinkTicket("");
        setErrorFound("");

        setErrorMessageCompanyName("");
        setErrorMessageCompanyBudget("");
        setErrorMessageDateReport("");
        setErrorMessagePriorityLevel("");
        setErrorMessagePriorityReason("");
        setErrorMessageLinkTicket("");
        setErrorMessageErrorFound("");
    }

    const BASE_URL = window.location.hostname === 'localhost'
        ? 'http://localhost:5000'
        : 'https://ticketflow-7gd8.onrender.com';

    const handleModalClose = () => {
        setshowSuccessModal(false);
        resetFields();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrorMessageCompanyName('');
        setErrorMessageCompanyBudget('');
        setErrorMessageDateReport('');
        setErrorMessagePriorityLevel('');
        setErrorMessagePriorityReason('');
        setErrorMessageErrorFound('');
        setErrorMessageLinkTicket('');


        try {
            const response = await fetch(`${BASE_URL}/api/ticketRegistration`, {
                method: 'POST',
                headers: {
                    'content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ companyName, companyBudget, dateReport, priorityLevel, priorityReason, errorFound, linkTicket })
            });

            const data = await response.json();
            if (!response.ok) {

                if (data.error.includes('name') || data.error.includes('Name')) {
                    setErrorMessageCompanyName(data.error);
                } else if (data.error.includes('budget') || data.error.includes('Budget')) {
                    setErrorMessageCompanyBudget(data.error);
                } else if (data.error.includes('date') || data.error.includes('Date')) {
                    setErrorMessageDateReport(data.error);
                } else if (data.error.includes('level') || data.error.includes('Level')) {
                    setErrorMessagePriorityLevel(data.error);
                } else if (data.error.includes('reason') || data.error.includes('Reason')) {
                    setErrorMessagePriorityReason(data.error);
                } else if (data.error.includes('found') || data.error.includes('Found')) {
                    setErrorMessageErrorFound(data.error);
                } else if (data.error.includes('link') || data.error.includes('Link')) {
                    setErrorMessageLinkTicket(data.error)
                } else {
                    alert(data.error);
                }

                return;
            }

            setshowSuccessModal(true);

        } catch (error) {
            console.error('Error when registering:', error);
            alert('Network error or server down');

        }
    }
    return {
        companyName,
        companyBudget,
        dateReport,
        priorityLevel,
        priorityReason,
        errorFound,
        linkTicket,

        setCompanyName,
        setCompanyBudget,
        setDateReport,
        setPriorityLevel,
        setPriorityReason,
        setErrorFound,
        setLinkTicket,

        errorMessageCompanyName,
        errorMessageCompanyBudget,
        errorMessageDateReport,
        errorMessagePriorityLevel,
        errorMessagePriorityReason,
        errorMessageErrorFound,
        errorMessageLinkTicket,

        handleSubmit,
        showSuccessModal,
        setshowSuccessModal,
        resetFields,
        handleModalClose
    };
};
