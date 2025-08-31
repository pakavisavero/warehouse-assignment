import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'

interface CreatePackageModalProps {
    isOpen: boolean
    onClose: () => void
    onCreate: (data: { orderRef: string; driver?: string }) => void
}

export default function CreatePackageModal({ isOpen, onClose, onCreate }: CreatePackageModalProps) {
    const [orderRef, setOrderRef] = useState('')
    const [driver, setDriver] = useState('')

    useEffect(() => {
        if (!isOpen) {
            setOrderRef('')
            setDriver('')
        }
    }, [isOpen])

    const handleSubmit = () => {
        if (!orderRef.trim()) return
        onCreate({ orderRef, driver: driver.trim() || undefined })
        onClose()
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-[var(--background)] py-5 px-6 text-left border border-[var(--border)] transition-all">
                                <Dialog.Title className="text-xl font-bold text-[var(--foreground)] mb-4">
                                    Create Package
                                </Dialog.Title>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                                            Order Reference (*)
                                        </label>
                                        <input
                                            type="text"
                                            value={orderRef}
                                            onChange={e => setOrderRef(e.target.value.toUpperCase())}
                                            className="w-full rounded-xl border border-[var(--border)] bg-[var(--input)] px-3 py-2 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                                            Driver Code
                                        </label>
                                        <input
                                            type="text"
                                            value={driver}
                                            onChange={e => setDriver(e.target.value.toUpperCase())}
                                            className="w-full rounded-xl border border-[var(--border)] bg-[var(--input)] px-3 py-2 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                                        />
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end gap-3">
                                    <button
                                        onClick={onClose}
                                        className="rounded-md border border-[var(--border)] px-5 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--muted)] hover:shadow-sm transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        disabled={!orderRef.trim()}
                                        className={`rounded-md px-5 py-2 text-sm font-medium shadow transition ${orderRef.trim()
                                                ? 'bg-[var(--primary)] text-[var(--primary-foreground)] hover:brightness-90'
                                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            }`}
                                    >
                                        Create
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
