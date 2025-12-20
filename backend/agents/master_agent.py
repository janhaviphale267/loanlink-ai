class MasterAgent:
    def route(self, stage: str) -> str:
        if stage == "discovery":
            return "sales"
        if stage == "verification":
            return "verification"
        if stage == "underwriting":
            return "underwriting"
        return "closure"
