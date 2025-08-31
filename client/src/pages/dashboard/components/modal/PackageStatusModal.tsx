import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import type { Package } from '@/types/Package'
import { statusList } from '@/constants/status'
import { getStatusBadge } from '@/utils/statusUtils'

interface PackageStatusModalProps {
    pkg: Package
    isOpen: boolean
    onClose: () => void
    onSave: (id: string, status: string) => void
}

const nextStatusMap: Record<string, string> = {
    WAITING: "PICKED",
    PICKED: "HANDED_OVER",
    HANDED_OVER: "COMPLETED",
}

export default function PackageStatusModal({ pkg, isOpen, onClose, onSave }: PackageStatusModalProps) {
    const [selectedStatus, setSelectedStatus] = useState(
        nextStatusMap[pkg.status] || pkg.status
    )
    const badge = getStatusBadge(pkg.status)

    useEffect(() => {
        if (isOpen) {
            setSelectedStatus(nextStatusMap[pkg.status] || pkg.status)
        }
    }, [isOpen, pkg.status])


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
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-[var(--background)] p-6 text-left border border-[var(--border)] transition-all">
                                <div className="mb-4">
                                    <Dialog.Title className="text-xl font-bold text-[var(--foreground)]">
                                        Update Package #{pkg.package_id}
                                    </Dialog.Title>
                                    <Dialog.Description className="mt-1 text-sm text-[var(--muted-foreground)] border-b border-[var(--border)] pb-3">
                                        Change the status of this package below
                                    </Dialog.Description>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                                        Current Status
                                    </label>
                                    <div className="inline-flex items-center gap-2">
                                        <span
                                            className={`w-4 h-4 rounded-full ${badge.color} border border-[var(--border)]`}
                                        />
                                        <span className="text-sm font-semibold text-[var(--foreground)]">
                                            {pkg.status.replace('_', ' ')}
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                                        New Status
                                    </label>
                                    <select
                                        value={selectedStatus}
                                        onChange={e => setSelectedStatus(e.target.value)}
                                        className="w-full rounded-xl border border-[var(--border)] bg-[var(--input)] px-3 py-2 text-[var(--foreground)] transition-all hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                                    >
                                        {statusList
                                            .filter(status => !['ALL', 'EXPIRED', pkg.status].includes(status))
                                            .map(status => (
                                                <option key={status} value={status}>
                                                    {status.replace('_', ' ')}
                                                </option>
                                            ))}
                                    </select>
                                </div>

                                <div className="flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="rounded-xl border border-[var(--border)] px-5 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--muted)] hover:shadow-sm transition cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            onSave(pkg.id, selectedStatus)
                                            onClose()
                                        }}
                                        className="rounded-xl bg-[var(--primary)] px-5 py-2 text-sm font-medium text-[var(--primary-foreground)] shadow hover:brightness-90 transition cursor-pointer"
                                    >
                                        Update
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
