from laya import Router
import warnings
warnings.filterwarnings("ignore", message="laya: this checkpoint ships invalid temperatures")

router = Router()

state = {
    "subject": "Duplicate charge",
    "body": "We were billed twice for March. Please refund the duplicate today or we will cancel our plan."
}

questions = {
    "department": {
        "type": "choice",
        "instructions": "Which department should handle this request?",
        "criteria": {
            "billing": "invoices, payments, refunds",
            "technical": "bugs, outages, errors",
            "other": "everything else"}},
    "urgency": {
        "type": "score",
        "instructions": "How urgent is the request?",
        "criteria": ["routine", "soon", "blocking"] },
    "churn_risk": {
        "type": "noul",
        "instructions": "Does the customer explicitly threaten to cancel?"
    },
}

result = router.predict(state, questions)
print(result["answers"]["department"]["choice"])
print(result["answers"]["urgency"]["score"])
print(result["answers"]["churn_risk"]["noul"])
print(result["routing"]["model"])
