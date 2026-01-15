import React, { useState } from 'react';
import { bugService } from '../../services';
import toast from 'react-hot-toast';

interface BugReportModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const BugReportModal: React.FC<BugReportModalProps> = ({ isOpen, onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim() || !description.trim()) {
            toast.error('Please fill in both title and description');
            return;
        }

        try {
            setIsSubmitting(true);

            // JWT token is automatically sent via Authorization header
            // Backend will extract user_id from the token
            await bugService.createBug({
                title: title.trim(),
                description: description.trim(),
            });
            toast.success('Bug report submitted successfully!');
            setTitle('');
            setDescription('');
            onClose();
        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Failed to submit bug report');
            console.error('Error submitting bug:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        if (!isSubmitting) {
            setTitle('');
            setDescription('');
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white shadow-sharp border border-border-subtle w-full max-w-[500px] mx-4">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border-subtle">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">bug_report</span>
                        <h2 className="text-xl font-bold text-text-main font-display">Report a Bug</h2>
                    </div>
                    <button
                        onClick={handleClose}
                        disabled={isSubmitting}
                        className="text-text-secondary hover:text-text-main transition-colors disabled:opacity-50"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Title Input */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="bug-title" className="text-sm font-semibold text-text-main">
                            Bug Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="bug-title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter a brief title for the bug"
                            disabled={isSubmitting}
                            className="w-full px-4 py-2.5 text-sm border border-border-subtle focus:border-primary focus:outline-none disabled:bg-bg-page disabled:cursor-not-allowed"
                            maxLength={100}
                        />
                    </div>

                    {/* Description Textarea */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="bug-description" className="text-sm font-semibold text-text-main">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="bug-description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe the bug in detail..."
                            disabled={isSubmitting}
                            rows={6}
                            className="w-full px-4 py-2.5 text-sm border border-border-subtle focus:border-primary focus:outline-none resize-none disabled:bg-bg-page disabled:cursor-not-allowed"
                            maxLength={500}
                        />
                        <p className="text-xs text-text-secondary text-right">
                            {description.length}/500 characters
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={isSubmitting}
                            className="px-6 py-2.5 text-sm font-medium text-text-main bg-transparent hover:bg-bg-page border border-border-subtle transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-2.5 text-sm font-bold text-white bg-primary hover:bg-primary-dark shadow-sharp transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isSubmitting && (
                                <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                            )}
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BugReportModal;
