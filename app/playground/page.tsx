import { Button } from "@/components/ui/button";
import { tenantContext }
from "@/core/tenancy";

export default async function PlaygroundPage({
          searchParams,
          }: {
            searchParams: Promise<{
                tenant?: string;
                  }>;
                  }) {
                const params =
                  await searchParams;

                  const tenant =
                    params.tenant;

    return (
        <main
              className="min-h-screen p-10"
                    style={{
                            background: "var(--bzr-surface-page)",
                                    color: "var(--bzr-text-primary)",
                                          }}
                                              >
                                                    <h1
                                                            className="mb-4 text-3xl font-bold"
                                                                    style={{
                                                                              color: "var(--bzr-text-primary)",
                                                                                      }}
                                                                                            >
                                                                                                    🎨 Baazarify UI Playground
                                                                                                          </h1>

                                                                                                                <div
                                                                                                                        className="mb-8 rounded-lg border p-4"
                                                                                                                                style={{
                                                                                                                                          borderColor: "#333",
                                                                                                                                                  }}
                                                                                                                                                        >
                                                                                                                                                                <p>
                                                                                                                                                                          <strong>Tenant ID:</strong>{" "}
                                                                                                                                                                                    {tenant ?? "No Tenant"}
                                                                                                                                                                                            </p>

                                                                                                                                                                                                    <p>
                                                                                                                                                                                                              <strong>Tenant Name:</strong>{" "}
                                                                                                                                                                                                                        {tenant
                                                                                                                                                                                                                          ? `Store ${tenant}`
                                                                                                                                                                                                                            : "Unknown"}
                                                                                                                                                                                                                                </p>

                                                                                                                                                                                                                                        <p>
                                                                                                                                                                                                                                                  <strong>Subdomain:</strong>{" "}
                                                                                                                                                                                                                                                            {tenant ?? "N/A"}
                                                                                                                                                                                                                                                                    </p>
                                                                                                                                                                                                                                                                          </div>

                                                                                                                                                                                                                                                                                <div className="flex flex-wrap gap-4">
                                                                                                                                                                                                                                                                                        <Button>Primary</Button>

                                                                                                                                                                                                                                                                                                <Button variant="secondary">
                                                                                                                                                                                                                                                                                                          Secondary
                                                                                                                                                                                                                                                                                                                  </Button>

                                                                                                                                                                                                                                                                                                                          <Button variant="outline">
                                                                                                                                                                                                                                                                                                                                    Outline
                                                                                                                                                                                                                                                                                                                                            </Button>

                                                                                                                                                                                                                                                                                                                                                    <Button variant="ghost">
                                                                                                                                                                                                                                                                                                                                                              Ghost
                                                                                                                                                                                                                                                                                                                                                                      </Button>

                                                                                                                                                                                                                                                                                                                                                                              <Button variant="success">
                                                                                                                                                                                                                                                                                                                                                                                        Success
                                                                                                                                                                                                                                                                                                                                                                                                </Button>

                                                                                                                                                                                                                                                                                                                                                                                                        <Button variant="warning">
                                                                                                                                                                                                                                                                                                                                                                                                                  Warning
                                                                                                                                                                                                                                                                                                                                                                                                                          </Button>

                                                                                                                                                                                                                                                                                                                                                                                                                                  <Button variant="destructive">
                                                                                                                                                                                                                                                                                                                                                                                                                                            Delete
                                                                                                                                                                                                                                                                                                                                                                                                                                                    </Button>

                                                                                                                                                                                                                                                                                                                                                                                                                                                            <Button variant="link">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                      Link
                                                                                                                                                                                                                                                                                                                                                                                                                                                                              </Button>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      <Button loading>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                Loading
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        </Button>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  </main>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    );
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    }