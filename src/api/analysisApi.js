import { apiClient } from './client'

export const analyzeCropImage = async (file) => {
  const data = await apiClient.analyzeImage(file)

  return {
    label: data.predictedClass,
    confidence: data.confidence,
    recommendation: data.fertilizerPlan.recommendation,
    detailed: data,
  }
}

export const buildDetailedAnalysisMessage = (data) => {
  return `Detailed Analysis Report
Crop: ${data.crop}
File: ${data.fileName}
Prediction: ${data.predictedClass}
Confidence: ${Math.round(data.confidence * 100)}%
Severity: ${data.severity}

Summary:
${data.summary}

Key Symptoms:
- ${data.keySymptoms.join('\n- ')}

Likely Causes:
- ${data.likelyCauses.join('\n- ')}

Immediate Actions:
- ${data.immediateActions.join('\n- ')}

Fertilizer Plan:
- ${data.fertilizerPlan.recommendation}
- Dose: ${data.fertilizerPlan.dosagePerAcre}
- Caution: ${data.fertilizerPlan.caution}

Prevention Tips:
- ${data.preventionTips.join('\n- ')}

Follow-up:
${data.followUp}`
}
