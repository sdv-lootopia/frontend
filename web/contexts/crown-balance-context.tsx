"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Transaction, TransactionHistory } from "@/types/transaction"

interface CrownBalanceContextType {
    balance: number
    isLoading: boolean
    transactions: Transaction[]
    transactionHistory: TransactionHistory
    addCrowns: (amount: number, description: string, metadata?: Transaction["metadata"]) => void
    spendCrowns: (amount: number, description: string, metadata?: Transaction["metadata"]) => boolean
    getTransactionById: (id: string) => Transaction | undefined
    getTransactionsByType: (type: Transaction["type"]) => Transaction[]
    getTotalSpentThisMonth: () => number
    getTotalEarnedThisMonth: () => number
    clearTransactionHistory: () => void
    syncFromStorage: () => void
    isInitialized: boolean
}

const CrownBalanceContext = createContext<CrownBalanceContextType | null>(null)

const INITIAL_BALANCE = 1300

export function CrownBalanceProvider({ children }: { children: ReactNode }) {
    const [balance, setBalance] = useState(INITIAL_BALANCE)
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        try {
            const savedBalance = localStorage.getItem("lootopia-crown-balance")
            const savedTransactions = localStorage.getItem("lootopia-transactions")

            if (savedBalance) {
                const parsedBalance = Number.parseInt(savedBalance, 10)
                console.log("🔄 Chargement balance depuis localStorage:", parsedBalance)
                setBalance(parsedBalance)
            }

            if (savedTransactions) {
                const parsedTransactions = JSON.parse(savedTransactions)
                const transactionsWithDates = parsedTransactions.map((transaction: any) => ({
                    ...transaction,
                    timestamp: new Date(transaction.timestamp),
                }))
                setTransactions(transactionsWithDates)
            }
        } catch (error) {
            console.error("Erreur lors du chargement des données de solde:", error)
        } finally {
            // Petit délai pour éviter le flash
            setTimeout(() => setIsLoading(false), 100)
        }
    }, [])

    useEffect(() => {
        if (!isLoading) {
            console.log("💾 Sauvegarde balance dans localStorage:", balance)
            localStorage.setItem("lootopia-crown-balance", balance.toString())
            localStorage.setItem("lootopia-transactions", JSON.stringify(transactions))
        }
    }, [balance, transactions, isLoading])

    const addCrowns = (amount: number, description: string, metadata?: Transaction["metadata"]) => {
        console.log("🎯 addCrowns appelé avec:", { amount, description, metadata })
        console.log("🎯 Balance AVANT:", balance)

        const transaction: Transaction = {
            id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            type: metadata?.packSize ? "crown_purchase" : "sale",
            amount: amount,
            description,
            timestamp: new Date(),
            metadata,
        }

        console.log("🎯 Nouvelle balance sera:", balance + amount)
        setBalance((prev) => {
            const newBalance = prev + amount
            console.log("🎯 setBalance: de", prev, "à", newBalance)
            return newBalance
        })

        setTransactions((prev) => [transaction, ...prev])
        console.log("🎯 Transaction ajoutée:", transaction)
    }

    const spendCrowns = (amount: number, description: string, metadata?: Transaction["metadata"]): boolean => {
        if (balance < amount) {
            return false
        }

        const transaction: Transaction = {
            id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            type: "purchase",
            amount: -amount,
            description,
            timestamp: new Date(),
            metadata,
        }

        setBalance((prev) => prev - amount)
        setTransactions((prev) => [transaction, ...prev])
        return true
    }

    const getTransactionById = (id: string): Transaction | undefined => {
        return transactions.find((transaction) => transaction.id === id)
    }

    const getTransactionsByType = (type: Transaction["type"]): Transaction[] => {
        return transactions.filter((transaction) => transaction.type === type)
    }

    const getTotalSpentThisMonth = (): number => {
        const now = new Date()
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

        return transactions
            .filter((transaction) => transaction.timestamp >= startOfMonth && transaction.amount < 0)
            .reduce((total, transaction) => total + Math.abs(transaction.amount), 0)
    }

    const getTotalEarnedThisMonth = (): number => {
        const now = new Date()
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

        return transactions
            .filter((transaction) => transaction.timestamp >= startOfMonth && transaction.amount > 0)
            .reduce((total, transaction) => total + transaction.amount, 0)
    }

    const clearTransactionHistory = () => {
        setTransactions([])
    }

    const transactionHistory: TransactionHistory = {
        transactions,
        totalTransactions: transactions.length,
        totalSpent: transactions.filter((t) => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0),
        totalEarned: transactions.filter((t) => t.amount > 0).reduce((sum, t) => sum + t.amount, 0),
        lastUpdated: transactions.length > 0 ? transactions[0].timestamp : new Date(),
    }

    const syncFromStorage = () => {
        const savedBalance = localStorage.getItem("lootopia-crown-balance")
        const savedTransactions = localStorage.getItem("lootopia-transactions")

        if (savedBalance) {
            setBalance(Number.parseInt(savedBalance, 10))
        }

        if (savedTransactions) {
            const parsedTransactions = JSON.parse(savedTransactions)
            const transactionsWithDates = parsedTransactions.map((transaction: any) => ({
                ...transaction,
                timestamp: new Date(transaction.timestamp),
            }))
            setTransactions(transactionsWithDates)
        }

        console.log("🔁 Contexte resynchronisé depuis localStorage")
    }

    const value = {
        balance,
        isLoading,
        transactions,
        transactionHistory,
        addCrowns,
        spendCrowns,
        getTransactionById,
        getTransactionsByType,
        getTotalSpentThisMonth,
        getTotalEarnedThisMonth,
        clearTransactionHistory,
        syncFromStorage,
        isInitialized: !isLoading,
    }

    return <CrownBalanceContext.Provider value={value}>{children}</CrownBalanceContext.Provider>
}

export function useCrownBalance() {
    const context = useContext(CrownBalanceContext)
    if (context === null) {
        throw new Error("useCrownBalance must be used within a CrownBalanceProvider")
    }
    return context
}
