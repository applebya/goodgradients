import { useState, useCallback, useEffect, useMemo } from 'react';
import type { Gradient, WizardVibe, WizardColorTemp, WizardUseCase, WizardAnimationPref, WizardSelections } from '@/types';
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

const TOTAL_STEPS = 4;

export interface UseDiscoveryWizardReturn {
  // Wizard state
  isOpen: boolean;
  currentStep: number;
  selections: WizardSelections;
  hasActiveFilters: boolean;

  // Computed values
  filteredGradients: Gradient[];
  matchCount: number;
  totalSteps: number;
  canGoBack: boolean;
  canGoNext: boolean;
  isLastStep: boolean;

  // Actions
  openWizard: () => void;
  closeWizard: () => void;
  skipWizard: () => void;
  nextStep: () => void;
  prevStep: () => void;
  setVibe: (vibe: WizardVibe | null) => void;
  toggleColorTemp: (colorTemp: WizardColorTemp) => void;
  setUseCase: (useCase: WizardUseCase | null) => void;
  setAnimationPref: (pref: WizardAnimationPref | null) => void;
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
      // Small delay to let the page render first
      const timer = setTimeout(() => setIsOpen(true), 500);
      return () => clearTimeout(timer);
    } else {
      // Load saved preferences if they exist
      const saved = loadWizardPrefs();
      if (saved) {
        setAppliedSelections(saved);
        setSelections(saved);
      }
    }
  }, []);

  // Computed values
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
      appliedSelections.colorTemps.length > 0 ||
      appliedSelections.useCase !== null ||
      appliedSelections.animationPref !== null
    );
  }, [appliedSelections]);

  const canGoBack = currentStep > 0;
  const canGoNext = currentStep < TOTAL_STEPS - 1;
  const isLastStep = currentStep === TOTAL_STEPS - 1;

  // Actions
  const openWizard = useCallback(() => {
    setCurrentStep(0);
    // Reset to applied selections or default
    setSelections(appliedSelections ?? getDefaultSelections());
    setIsOpen(true);
  }, [appliedSelections]);

  const closeWizard = useCallback(() => {
    setIsOpen(false);
    setCurrentStep(0);
  }, []);

  const skipWizard = useCallback(() => {
    setWizardCompleted();
    setIsOpen(false);
    setCurrentStep(0);
    // Don't apply any filters
    setAppliedSelections(null);
    clearWizardPrefs();
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

  const toggleColorTemp = useCallback((colorTemp: WizardColorTemp) => {
    setSelections(prev => {
      const exists = prev.colorTemps.includes(colorTemp);
      return {
        ...prev,
        colorTemps: exists
          ? prev.colorTemps.filter(c => c !== colorTemp)
          : [...prev.colorTemps, colorTemp],
      };
    });
  }, []);

  const setUseCase = useCallback((useCase: WizardUseCase | null) => {
    setSelections(prev => ({ ...prev, useCase }));
  }, []);

  const setAnimationPref = useCallback((animationPref: WizardAnimationPref | null) => {
    setSelections(prev => ({ ...prev, animationPref }));
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
    // Wizard state
    isOpen,
    currentStep,
    selections,
    hasActiveFilters,

    // Computed values
    filteredGradients,
    matchCount,
    totalSteps: TOTAL_STEPS,
    canGoBack,
    canGoNext,
    isLastStep,

    // Actions
    openWizard,
    closeWizard,
    skipWizard,
    nextStep,
    prevStep,
    setVibe,
    toggleColorTemp,
    setUseCase,
    setAnimationPref,
    applyFilters,
    clearFilters,
  };
}
