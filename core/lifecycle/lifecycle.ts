export type LifecycleStage =
  | "booting"
    | "initializing"
      | "ready"
        | "shutdown";

        export class LifecycleManager {
          private stage: LifecycleStage = "booting";

            getStage(): LifecycleStage {
                return this.stage;
                  }

                    setStage(stage: LifecycleStage): void {
                        this.stage = stage;
                          }

                            isReady(): boolean {
                                return this.stage === "ready";
                                  }
                                  }

                                  export const lifecycle = new LifecycleManager();
                                  