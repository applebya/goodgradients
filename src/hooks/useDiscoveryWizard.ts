import { useState, useCallback, useEffect, useMemo } from 'react';
import type { Gradient, WizardVibe, WizardColor, WizardSelections } from '@/types';
import {
  hasCompletedWizard,
  setWizardCompleted,
  saveWizardPrefs,
  loadWizardPrefs,
  clearWizardPrefs,
  getDefaultSelections,
  filterGradientsBySelections,
  countMatchingGradients,
} from '@/lib/wizard';

const TOTAL_STEPS = 2; // Vibe → Colors

export interface UseDiscoveryWizardReturn {
  isOpen: boolean;
  currentStep: number;
  selections: WizardSelections;
  hasActiveFilters: boolean;
  filteredGradients: Gradient[];
  matchCount: number;
  totalSteps: number;
  canGoBack: boolean;
  isLastStep: boolean;

  openWizard: () => void;
  closeWizard: () => void;
  nextStep: () => void;
  prevStep: () => void;
  setVibe: (vibe: WizardVibe | null) => void;
  toggleColor: (color: WizardColor) => void;
  applyFilters: () => void;
  clearFilters: () => void;
}

export function useDiscoveryWizard(allGradients: Gradient[]): UseDiscoveryWizardReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<WizardSelections>(getDefaultSelections);
  const [appliedSelections, setAppliedSelections] = useState<WizardSelections | null>(null);

  // Auto-open wizard on first visit
  useEffect(() => {
    const completed = hasCompletedWizard();
    if (!completed) {
      const timer = setTimeout(() => setIsOpen(true), 300);
      return () => clearTimeout(timer);
    } else {
      const saved = loadWizardPrefs();
      if (saved) {
        setAppliedSelections(saved);
        setSelections(saved);
      }
    }
  }, []);

  const filteredGradients = useMemo(() => {
    if (!appliedSelections) return allGradients;
    return filterGradientsBySelections(allGradients, appliedSelections);
  }, [allGradients, appliedSelections]);

  const matchCount = useMemo(() => {
    return countMatchingGradients(allGradients, selections);
  }, [allGradients, selections]);

  const hasActiveFilters = useMemo(() => {
    return appliedSelections !== null && (
      appliedSelections.vibe !== null ||
      appliedSelections.colors.length > 0
    );
  }, [appliedSelections]);

  const canGoBack = currentStep > 0;
  const isLastStep = currentStep === TOTAL_STEPS - 1;

  const openWizard = useCallback(() => {
    setCurrentStep(0);
    setSelections(appliedSelections ?? getDefaultSelections());
    setIsOpen(true);
  }, [appliedSelections]);

  const closeWizard = useCallback(() => {
    setWizardCompleted();
    setIsOpen(false);
    setCurrentStep(0);
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const setVibe = useCallback((vibe: WizardVibe | null) => {
    setSelections(prev => ({ ...prev, vibe }));
  }, []);

  const toggleColor = useCallback((color: WizardColor) => {
    setSelections(prev => {
      const exists = prev.colors.includes(color);
      return {
        ...prev,
        colors: exists
          ? prev.colors.filter(c => c !== color)
          : [...prev.colors, color],
      };
    });
  }, []);

  const applyFilters = useCallback(() => {
    setWizardCompleted();
    setAppliedSelections(selections);
    saveWizardPrefs(selections);
    setIsOpen(false);
    setCurrentStep(0);
  }, [selections]);

  const clearFilters = useCallback(() => {
    setAppliedSelections(null);
    setSelections(getDefaultSelections());
    clearWizardPrefs();
  }, []);

  return {
    isOpen,
    currentStep,
    selections,
    hasActiveFilters,
    filteredGradients,
    matchCount,
    totalSteps: TOTAL_STEPS,
    canGoBack,
    isLastStep,
    openWizard,
    closeWizard,
    nextStep,
    prevStep,
    setVibe,
    toggleColor,
    applyFilters,
    clearFilters,
  };
}
